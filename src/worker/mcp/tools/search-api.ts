import { getComponentsData, getCssVariablesData } from '../utils/data-loader';
import {
  searchParameters,
  searchMethods,
  searchEvents,
  searchCssVariables,
  searchAll,
} from '../utils/search';
import { toolResult, toolError, catchToolError } from '../utils/tool-helpers';
import type { ToolCallResult } from '../types';

interface SearchApiParams {
  query: string;
  type?: 'parameter' | 'method' | 'event' | 'css-variable' | 'all';
}

export function searchApi(
  params: SearchApiParams
): ToolCallResult {
  try {
    const { query, type = 'all' } = params;

    if (!query || typeof query !== 'string') {
      return toolError('Query parameter is required and must be a string');
    }

    const componentsData = getComponentsData();
    const cssVarsData = getCssVariablesData();
    let results;

    switch (type) {
      case 'parameter':
        results = searchParameters(query, componentsData);
        break;
      case 'method':
        results = searchMethods(query, componentsData);
        break;
      case 'event':
        results = searchEvents(query, componentsData);
        break;
      case 'css-variable':
        results = searchCssVariables(query, cssVarsData);
        break;
      case 'all':
      default:
        results = searchAll(query, componentsData, cssVarsData);
        break;
    }

    return toolResult(results);
  } catch (error) {
    return catchToolError(error);
  }
}
