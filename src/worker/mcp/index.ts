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
import type { InitializeParams } from './types';
import { handleInitialize } from './handlers/initialize';
import { track } from '../agent-analytics/index.js';
import {
  handleToolsList,
  handleToolsCall,
} from './handlers/tools';

export const mcpApp = new Hono<{ Bindings: CloudflareBindings }>();

/** The argument that best says what a tool call was looking for. */
function intentOf(args: unknown): string | undefined {
  if (!args || typeof args !== 'object') return undefined;
  const a = args as Record<string, unknown>;
  for (const key of ['query', 'name', 'slug', 'component', 'framework']) {
    const v = a[key];
    if (typeof v === 'string' && v) return v;
  }
  return undefined;
}

/** Flat copy of the arguments for the analytics props field. */
function flatArgs(args: unknown): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!args || typeof args !== 'object') return out;
  for (const [k, v] of Object.entries(args as Record<string, unknown>)) {
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') out[k] = v;
  }
  return out;
}

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
    track(c, 'mcp.call', { value: method, props: { notification: id === undefined } });

    // Handle notifications (requests without id) - these don't expect a response
    if (id === undefined) {
      return c.body(null, 204);
    }

    // Route to appropriate handler for requests (with id)
    let result;

    switch (method) {
      case 'initialize': {
        result = handleInitialize(params as InitializeParams);
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
        track(c, 'mcp.tool', {
          value: toolParams.name,
          query: intentOf(toolParams.arguments),
          props: { ...flatArgs(toolParams.arguments), isError: result.isError === true },
        });
        break;
      }

      default:
        // JSON-RPC errors travel in the body with HTTP 200. Clients probe
        // methods we do not implement (resources/list, prompts/list, ...)
        // and a 404 makes them treat the whole server as unreachable.
        return c.json(createMethodNotFoundError(id, method), 200);
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
