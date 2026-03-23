import { getDemoFile, findDemoBySlug } from '../utils/data-loader';
import { toolResult, toolError, catchToolError } from '../utils/tool-helpers';
import type { ToolCallResult } from '../types';

interface GetDemoParams {
  slug: string;
  framework: string;
}

export async function getDemo(
  params: GetDemoParams,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string
): Promise<ToolCallResult> {
  try {
    const { slug, framework } = params;

    if (!slug || typeof slug !== 'string') {
      return toolError('Slug parameter is required and must be a string');
    }

    if (!framework || typeof framework !== 'string') {
      return toolError(
        'Framework parameter is required and must be a string (e.g., "core", "vue", "react", "svelte")'
      );
    }

    const demo = findDemoBySlug(slug);
    if (!demo) {
      return toolError(`Demo with slug "${slug}" not found`);
    }

    if (!(demo.frameworks as readonly string[]).includes(framework)) {
      return toolError(
        `Framework "${framework}" is not available for demo "${slug}". Available frameworks: ${demo.frameworks.join(', ')}`
      );
    }

    return toolResult(await getDemoFile(slug, framework, assets, baseUrl));
  } catch (error) {
    return catchToolError(error);
  }
}
