import type { Tool, ToolCallParams, ToolCallResult } from '../types';
import { getTools } from './initialize';
import { searchApi } from '../tools/search-api';
import { getComponent } from '../tools/get-component';
import { getParameter } from '../tools/get-parameter';
import { getMethod } from '../tools/get-method';
import { getEvent } from '../tools/get-event';
import { getCssVariables } from '../tools/get-css-variables';
import { listComponents } from '../tools/list-components';
import { listDemos } from '../tools/list-demos';
import { getDemo } from '../tools/get-demo';

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
      const searchArgs = args as {
        query: string;
        type?: 'parameter' | 'method' | 'event' | 'css-variable' | 'all';
      };
      return searchApi(searchArgs);
    }

    case 'get-component':
      return getComponent(args as { name: string });

    case 'get-parameter':
      return getParameter(args as { name: string; component?: string });

    case 'get-method':
      return getMethod(args as { name: string; component?: string });

    case 'get-event':
      return getEvent(args as { name: string; component?: string });

    case 'get-css-variables':
      return getCssVariables(args as { component: string });

    case 'list-components':
      return listComponents();

    case 'list-demos':
      return listDemos();

    case 'get-demo':
      return await getDemo(
        args as { slug: string; framework: string },
        assets,
        baseUrl
      );

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
