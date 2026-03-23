import { getDemosData } from '../utils/data-loader';
import { toolResult, catchToolError } from '../utils/tool-helpers';
import type { ToolCallResult } from '../types';

export async function listDemos(): Promise<ToolCallResult> {
  try {
    return toolResult(getDemosData());
  } catch (error) {
    return catchToolError(error);
  }
}
