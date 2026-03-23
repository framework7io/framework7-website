import type { InitializeParams, InitializeResult, Tool } from '../types';

const tools: Tool[] = [
  {
    name: 'search-api',
    description:
      'Search Framework7 API documentation across parameters, methods, events, and CSS variables. Returns matching results with descriptions.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query string',
        },
        type: {
          type: 'string',
          enum: ['parameter', 'method', 'event', 'css-variable', 'all'],
          description:
            'Filter by type: "parameter", "method", "event", "css-variable", or "all"',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get-component',
    description:
      'Get the full API for a Framework7 component including parameters, events, methods, app methods, app parameters, app events, DOM events, and CSS variables.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'Component name (e.g., "dialog", "popup", "smart-select", "color-picker"). Accepts kebab-case or PascalCase.',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get-parameter',
    description:
      'Get detailed information about a specific Framework7 parameter/option by name, including type, default value, and description.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The parameter name (e.g., "backdrop", "animate", "closeByBackdropClick")',
        },
        component: {
          type: 'string',
          description: 'Optional component name to scope the search (e.g., "dialog", "popup")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get-method',
    description:
      'Get detailed information about a specific Framework7 method by name, including signature, parameters, and description. Covers both instance methods and app-level methods.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The method name (e.g., "open", "close", "create", "destroy")',
        },
        component: {
          type: 'string',
          description: 'Optional component name to scope the search (e.g., "dialog", "popup")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get-event',
    description:
      'Get detailed information about a specific Framework7 event by name, including parameters and description. Covers instance events, app-level events, and DOM events.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The event name (e.g., "open", "opened", "close", "closed")',
        },
        component: {
          type: 'string',
          description: 'Optional component name to scope the search (e.g., "dialog", "popup")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get-css-variables',
    description:
      'Get CSS custom properties (variables) for a Framework7 component, grouped by theme (iOS, Material Design) with their values.',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component name (e.g., "dialog", "navbar", "toolbar")',
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'list-components',
    description:
      'List all available Framework7 components and modules with their names and descriptions.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'list-demos',
    description:
      'List all available Framework7 demos with their slugs and available frameworks (core, vue, react, svelte).',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'get-demo',
    description:
      'Get demo source code for a specific Framework7 demo in a given framework (core, vue, react, or svelte).',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The demo slug (e.g., "accordion", "action-sheet", "color-themes")',
        },
        framework: {
          type: 'string',
          enum: ['core', 'vue', 'react', 'svelte'],
          description: 'The framework variant',
        },
      },
      required: ['slug', 'framework'],
    },
  },
];

export function handleInitialize(
  params: InitializeParams
): InitializeResult {
  return {
    protocolVersion: params.protocolVersion || '2024-11-05',
    capabilities: {
      tools: {
        listChanged: false,
      },
    },
    serverInfo: {
      name: 'framework7-mcp-server',
      version: '1.0.0',
    },
  };
}

export function getTools(): Tool[] {
  return tools;
}
