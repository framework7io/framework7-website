import { getComponentsData } from '../utils/data-loader';
import { toolResult, catchToolError } from '../utils/tool-helpers';
import type { ToolCallResult } from '../types';

export function listComponents(): ToolCallResult {
  try {
    const componentsData = getComponentsData();

    const components = Object.values(componentsData).map((comp) => ({
      name: comp.name,
      dirName: comp.dirName,
      hasParameters: comp.parameters.length > 0,
      hasEvents:
        comp.events.length > 0 ||
        comp.domEvents.length > 0 ||
        comp.appEvents.length > 0,
      hasMethods:
        comp.instanceMethods.length > 0 || comp.appMethods.length > 0,
    }));

    return toolResult(components);
  } catch (error) {
    return catchToolError(error);
  }
}
