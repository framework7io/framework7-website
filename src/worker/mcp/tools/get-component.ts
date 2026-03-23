import { getComponentByName, getCssVariablesData } from '../utils/data-loader';
import { toolResult, toolError, catchToolError } from '../utils/tool-helpers';
import type { ToolCallResult } from '../types';

interface GetComponentParams {
  name: string;
}

export async function getComponent(
  params: GetComponentParams
): Promise<ToolCallResult> {
  try {
    const { name } = params;

    if (!name || typeof name !== 'string') {
      return toolError('Name parameter is required and must be a string');
    }

    const comp = getComponentByName(name);
    if (!comp) {
      return toolError(`Component "${name}" not found`);
    }

    const cssVarsData = getCssVariablesData();
    const cssVars = cssVarsData[comp.data.dirName] || null;

    return toolResult({ ...comp.data, cssVariables: cssVars });
  } catch (error) {
    return catchToolError(error);
  }
}
