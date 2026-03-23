import { Hono } from 'hono';
import {
  parseRequest,
  createResponse,
  createError,
  createParseError,
  createInvalidRequestError,
  createMethodNotFoundError,
} from './utils/jsonrpc';
import { JSON_RPC_ERROR_CODES } from './types';
import { handleInitialize } from './handlers/initialize';
import {
  handleToolsList,
  handleToolsCall,
} from './handlers/tools';

export const mcpApp = new Hono<{ Bindings: CloudflareBindings }>();

/**
 * GET /mcp - Basic endpoint info
 */
mcpApp.get('/', (c) => {
  return c.json({
    name: 'framework7-mcp-server',
    version: '1.0.0',
    protocol: 'mcp',
    endpoints: {
      post: '/mcp',
      health: '/mcp/health',
    },
  });
});

/**
 * POST /mcp - JSON-RPC endpoint (main entry point)
 */
mcpApp.post('/', async (c) => {
  try {
    const body = await c.req.text();

    if (!body) {
      console.error('MCP: Empty request body');
      return c.json(createParseError(), 400);
    }

    let request;
    try {
      request = parseRequest(body);
    } catch (error) {
      console.error('MCP: Parse error:', error, 'Body:', body.substring(0, 200));
      return c.json(createParseError(), 400);
    }

    // Validate request
    if (!request || !request.method) {
      console.error('MCP: Invalid request - missing method', request);
      return c.json(
        createInvalidRequestError(request?.id ?? null),
        400
      );
    }

    const { method, id, params } = request;

    console.log('MCP: Handling method:', method, 'id:', id);

    // Handle notifications (requests without id) - these don't expect a response
    if (id === undefined) {
      if (method === 'notifications/initialized') {
        return c.body(null, 204);
      }
      return c.body(null, 204);
    }

    // Route to appropriate handler for requests (with id)
    let result;

    switch (method) {
      case 'initialize': {
        result = handleInitialize(params as Parameters<typeof handleInitialize>[0]);
        break;
      }

      case 'ping': {
        result = { pong: true };
        break;
      }

      case 'tools/list': {
        result = { tools: handleToolsList() };
        break;
      }

      case 'tools/call': {
        if (!params || typeof params !== 'object') {
          return c.json(
            createError(
              id,
              JSON_RPC_ERROR_CODES.INVALID_PARAMS,
              'Invalid params: tools/call requires params with name and arguments'
            ),
            400
          );
        }

        const toolParams = params as {
          name: string;
          arguments?: unknown;
        };

        if (!toolParams.name) {
          return c.json(
            createError(
              id,
              JSON_RPC_ERROR_CODES.INVALID_PARAMS,
              'Invalid params: name is required'
            ),
            400
          );
        }

        const url = new URL(c.req.url);
        const baseUrl = `${url.protocol}//${url.host}`;

        result = await handleToolsCall(
          {
            name: toolParams.name,
            arguments: toolParams.arguments,
          },
          c.env.ASSETS,
          baseUrl
        );
        break;
      }

      default:
        return c.json(
          createMethodNotFoundError(id, method),
          404
        );
    }

    return c.json(createResponse(id, result));
  } catch (error) {
    console.error('MCP handler error:', error);
    return c.json(
      createError(
        null,
        JSON_RPC_ERROR_CODES.INTERNAL_ERROR,
        error instanceof Error ? error.message : 'Internal error',
        { error: String(error) }
      ),
      500
    );
  }
});

/**
 * Health check endpoint
 */
mcpApp.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'framework7-mcp-server' });
});
