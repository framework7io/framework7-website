import { getComponentsData } from '../utils/data-loader';
import { findMethod } from '../utils/search';
import { toolResult, toolError, catchToolError } from '../utils/tool-helpers';
import type { ToolCallResult } from '../types';

interface GetMethodParams {
  name: string;
  component?: string;
}

export function getMethod(
  params: GetMethodParams
): ToolCallResult {
  try {
    const { name, component } = params;

    if (!name || typeof name !== 'string') {
      return toolError('Name parameter is required and must be a string');
    }

    const componentsData = getComponentsData();
    const found = findMethod(name, componentsData, component);

    if (!found) {
      return toolError(
        `Method "${name}" not found${component ? ` in component "${component}"` : ''}`
      );
    }

    return toolResult({
      ...found.result,
      component: found.component,
      source: found.source,
    });
  } catch (error) {
    return catchToolError(error);
  }
}
