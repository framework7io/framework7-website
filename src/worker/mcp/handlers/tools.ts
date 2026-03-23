import type { Tool, ToolCallParams, ToolCallResult } from '../types';
import { getTools } from './initialize';

export function handleToolsList(): Tool[] {
  return getTools();
}

export async function handleToolsCall(
  params: ToolCallParams,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string
): Promise<ToolCallResult> {
  const { name, arguments: args } = params;

  switch (name) {
    case 'search-api': {
      // TODO: implement in Phase 4
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    case 'get-component': {
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    case 'get-parameter': {
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    case 'get-method': {
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    case 'get-event': {
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    case 'get-css-variables': {
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    case 'list-components': {
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    case 'list-demos': {
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    case 'get-demo': {
      return { content: [{ type: 'text', text: 'Not implemented yet' }], isError: true };
    }

    default:
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Unknown tool: ${name}`,
            }),
          },
        ],
        isError: true,
      };
  }
}
