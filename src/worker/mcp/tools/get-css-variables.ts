import { getCssVariablesData } from '../utils/data-loader';
import { toolResult, toolError, catchToolError, normalizeComponentName } from '../utils/tool-helpers';
import type { ToolCallResult } from '../types';

interface GetCssVariablesParams {
  component: string;
}

export function getCssVariables(
  params: GetCssVariablesParams
): ToolCallResult {
  try {
    const { component } = params;

    if (!component || typeof component !== 'string') {
      return toolError(
        'Component parameter is required and must be a string'
      );
    }

    const cssVarsData = getCssVariablesData();
    const normalized = normalizeComponentName(component);
    let matchedKey: string | null = null;

    for (const key of Object.keys(cssVarsData)) {
      if (normalizeComponentName(key) === normalized) {
        matchedKey = key;
        break;
      }
    }

    if (!matchedKey) {
      const available = Object.keys(cssVarsData).sort();
      return toolError(
        `CSS variables not found for component "${component}". Available components: ${available.join(', ')}`
      );
    }

    return toolResult({
      component: matchedKey,
      variables: cssVarsData[matchedKey],
    });
  } catch (error) {
    return catchToolError(error);
  }
}
