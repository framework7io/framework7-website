import type { ToolCallResult } from '../types';

/**
 * Normalize component name for matching (kebab-case, PascalCase, lowercase all match)
 */
export function normalizeComponentName(name: string): string {
  return name.toLowerCase().replace(/[-_\s]/g, '');
}

export function toolResult(data: unknown): ToolCallResult {
  return {
    content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
  };
}

export function toolError(message: string): ToolCallResult {
  return {
    content: [{ type: 'text', text: JSON.stringify({ error: message }) }],
    isError: true,
  };
}

export function catchToolError(error: unknown): ToolCallResult {
  return toolError(
    error instanceof Error ? error.message : 'Unknown error'
  );
}
