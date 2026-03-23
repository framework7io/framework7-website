import { componentsData } from '../data/components';
import { cssVariablesData } from '../data/css-variables';
import { demosData } from '../data/demos';
import { normalizeComponentName } from './tool-helpers';
import type { CssVariableItem } from './search';

type CssVariablesMap = Record<string, Record<string, readonly CssVariableItem[]>>;

// Cache for demo files
const demoCache = new Map<string, unknown>();

export function getComponentsData() {
  return componentsData;
}

export function getCssVariablesData(): CssVariablesMap {
  return cssVariablesData;
}

export function getDemosData() {
  return demosData;
}

/**
 * Get a component by name (supports kebab-case, PascalCase, or lowercase)
 */
export function getComponentByName(name: string) {
  const normalized = normalizeComponentName(name);

  for (const [key, comp] of Object.entries(componentsData)) {
    if (
      normalizeComponentName(key) === normalized ||
      normalizeComponentName(comp.dirName) === normalized
    ) {
      return { key, data: comp };
    }
  }
  return null;
}

/**
 * Fetch a demo file via ASSETS binding with caching
 */
export async function getDemoFile(
  slug: string,
  framework: string,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string
): Promise<Record<string, { content: string }>> {
  const cacheKey = `${slug}/${framework}`;

  if (demoCache.has(cacheKey)) {
    return demoCache.get(cacheKey) as Record<string, { content: string }>;
  }

  const demoUrl = new URL(`/mcp-demos/${slug}/${framework}.json`, baseUrl);
  const response = await assets.fetch(demoUrl.toString());

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Demo file not found: ${slug}/${framework}.json. Available frameworks may be limited for this demo.`
      );
    }
    throw new Error(
      `Failed to fetch demo file: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as Record<string, { content: string }>;
  demoCache.set(cacheKey, data);

  return data;
}

/**
 * Find a demo by slug
 */
export function findDemoBySlug(slug: string) {
  return demosData.find((demo) => demo.slug === slug);
}
