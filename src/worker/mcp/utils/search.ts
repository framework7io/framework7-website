interface ComponentData {
  readonly dirName: string;
  readonly name: string;
  readonly parameters: readonly ParameterItem[];
  readonly events: readonly EventItem[];
  readonly domEvents: readonly EventItem[];
  readonly appMethods: readonly MethodItem[];
  readonly appParams: readonly ParameterItem[];
  readonly appEvents: readonly EventItem[];
  readonly instanceProperties: readonly PropertyItem[];
  readonly instanceMethods: readonly MethodItem[];
}

interface ParameterItem {
  readonly name: string;
  readonly type?: string;
  readonly description?: string;
  readonly optional?: boolean;
  readonly default?: string;
}

interface EventItem {
  readonly name: string;
  readonly description?: string;
  readonly parameters?: readonly {
    name: string;
    type?: string;
    description?: string;
  }[];
}

interface MethodItem {
  readonly name: string;
  readonly description?: string;
  readonly parameters?: readonly {
    name: string;
    type?: string;
    optional?: boolean;
    description?: string;
  }[];
  readonly returnType?: string;
  readonly namespace?: string;
}

interface PropertyItem {
  readonly name: string;
  readonly type?: string;
  readonly description?: string;
}

interface CssVariableItem {
  readonly name: string;
  readonly value: string;
}

type ComponentsData = Record<string, ComponentData>;
type CssVariablesData = Record<
  string,
  Record<string, readonly CssVariableItem[]>
>;

export interface SearchResult {
  name: string;
  component: string;
  description?: string;
  category: 'parameter' | 'method' | 'event' | 'css-variable';
  source?: string;
  fullData?: unknown;
}

interface ScoredResult extends SearchResult {
  _score: number;
}

/**
 * Simple fuzzy matching score
 */
function fuzzyScore(query: string, text: string): number {
  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();

  if (lowerText === lowerQuery) return 100;
  if (lowerText.startsWith(lowerQuery)) return 80;
  if (lowerText.includes(lowerQuery)) return 60;

  const words = lowerText.split(/[-_\s]/);
  for (const word of words) {
    if (word.startsWith(lowerQuery)) return 50;
    if (word.includes(lowerQuery)) return 30;
  }

  let queryIndex = 0;
  for (
    let i = 0;
    i < lowerText.length && queryIndex < lowerQuery.length;
    i++
  ) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++;
    }
  }
  if (queryIndex === lowerQuery.length) return 20;

  return 0;
}

/**
 * Sort scored results by score, slice to limit, and strip internal _score field
 */
function finalizeResults(
  results: ScoredResult[],
  limit = 50
): SearchResult[] {
  return results
    .sort((a, b) => b._score - a._score)
    .slice(0, limit)
    .map(({ _score, ...rest }) => rest);
}

/**
 * Collect parameter matches with scores
 */
function collectParameters(
  query: string,
  componentsData: ComponentsData
): ScoredResult[] {
  const results: ScoredResult[] = [];

  for (const [compName, comp] of Object.entries(componentsData)) {
    for (const param of comp.parameters) {
      const score = fuzzyScore(query, param.name);
      if (score > 0) {
        results.push({
          name: param.name,
          component: compName,
          description: param.description,
          category: 'parameter',
          source: 'parameters',
          fullData: param,
          _score: score,
        });
      }
    }
    for (const param of comp.appParams) {
      const score = fuzzyScore(query, param.name);
      if (score > 0) {
        results.push({
          name: param.name,
          component: compName,
          description: param.description,
          category: 'parameter',
          source: 'appParams',
          fullData: param,
          _score: score,
        });
      }
    }
  }

  return results;
}

/**
 * Collect method matches with scores
 */
function collectMethods(
  query: string,
  componentsData: ComponentsData
): ScoredResult[] {
  const results: ScoredResult[] = [];

  for (const [compName, comp] of Object.entries(componentsData)) {
    for (const method of comp.instanceMethods) {
      const score = fuzzyScore(query, method.name);
      if (score > 0) {
        results.push({
          name: method.name,
          component: compName,
          description: method.description,
          category: 'method',
          source: 'instanceMethods',
          fullData: method,
          _score: score,
        });
      }
    }
    for (const method of comp.appMethods) {
      const score = fuzzyScore(query, method.name);
      if (score > 0) {
        results.push({
          name: method.name,
          component: compName,
          description: method.description,
          category: 'method',
          source: 'appMethods',
          fullData: method,
          _score: score,
        });
      }
    }
  }

  return results;
}

/**
 * Collect event matches with scores
 */
function collectEvents(
  query: string,
  componentsData: ComponentsData
): ScoredResult[] {
  const results: ScoredResult[] = [];

  for (const [compName, comp] of Object.entries(componentsData)) {
    for (const event of comp.events) {
      const score = fuzzyScore(query, event.name);
      if (score > 0) {
        results.push({
          name: event.name,
          component: compName,
          description: event.description,
          category: 'event',
          source: 'events',
          fullData: event,
          _score: score,
        });
      }
    }
    for (const event of comp.domEvents) {
      const score = fuzzyScore(query, event.name);
      if (score > 0) {
        results.push({
          name: event.name,
          component: compName,
          description: event.description,
          category: 'event',
          source: 'domEvents',
          fullData: event,
          _score: score,
        });
      }
    }
    for (const event of comp.appEvents) {
      const score = fuzzyScore(query, event.name);
      if (score > 0) {
        results.push({
          name: event.name,
          component: compName,
          description: event.description,
          category: 'event',
          source: 'appEvents',
          fullData: event,
          _score: score,
        });
      }
    }
  }

  return results;
}

/**
 * Collect CSS variable matches with scores
 */
function collectCssVariables(
  query: string,
  cssVariablesData: CssVariablesData
): ScoredResult[] {
  const results: ScoredResult[] = [];

  for (const [compName, scopes] of Object.entries(cssVariablesData)) {
    for (const [scope, vars] of Object.entries(scopes)) {
      for (const v of vars) {
        const score = fuzzyScore(query, v.name);
        if (score > 0) {
          results.push({
            name: v.name,
            component: compName,
            description: `${v.value} (${scope})`,
            category: 'css-variable',
            source: scope,
            fullData: v,
            _score: score,
          });
        }
      }
    }
  }

  return results;
}

/**
 * Search component parameters
 */
export function searchParameters(
  query: string,
  componentsData: ComponentsData
): SearchResult[] {
  return finalizeResults(collectParameters(query, componentsData));
}

/**
 * Search component methods
 */
export function searchMethods(
  query: string,
  componentsData: ComponentsData
): SearchResult[] {
  return finalizeResults(collectMethods(query, componentsData));
}

/**
 * Search component events
 */
export function searchEvents(
  query: string,
  componentsData: ComponentsData
): SearchResult[] {
  return finalizeResults(collectEvents(query, componentsData));
}

/**
 * Search CSS variables
 */
export function searchCssVariables(
  query: string,
  cssVariablesData: CssVariablesData
): SearchResult[] {
  return finalizeResults(collectCssVariables(query, cssVariablesData));
}

/**
 * Search all API items
 */
export function searchAll(
  query: string,
  componentsData: ComponentsData,
  cssVariablesData: CssVariablesData
): SearchResult[] {
  return finalizeResults([
    ...collectParameters(query, componentsData),
    ...collectMethods(query, componentsData),
    ...collectEvents(query, componentsData),
    ...collectCssVariables(query, cssVariablesData),
  ]);
}

/**
 * Find a specific parameter by name, optionally scoped to a component
 */
export function findParameter(
  name: string,
  componentsData: ComponentsData,
  component?: string
): { result: ParameterItem; component: string; source: string } | null {
  const entries = component
    ? Object.entries(componentsData).filter(
        ([, comp]) =>
          normalizeComponentName(comp.dirName) ===
            normalizeComponentName(component) ||
          normalizeComponentName(comp.name) ===
            normalizeComponentName(component)
      )
    : Object.entries(componentsData);

  for (const [compName, comp] of entries) {
    const param = comp.parameters.find((p) => p.name === name);
    if (param)
      return { result: param, component: compName, source: 'parameters' };

    const appParam = comp.appParams.find((p) => p.name === name);
    if (appParam)
      return { result: appParam, component: compName, source: 'appParams' };
  }
  return null;
}

/**
 * Find a specific method by name, optionally scoped to a component
 */
export function findMethod(
  name: string,
  componentsData: ComponentsData,
  component?: string
): { result: MethodItem; component: string; source: string } | null {
  const entries = component
    ? Object.entries(componentsData).filter(
        ([, comp]) =>
          normalizeComponentName(comp.dirName) ===
            normalizeComponentName(component) ||
          normalizeComponentName(comp.name) ===
            normalizeComponentName(component)
      )
    : Object.entries(componentsData);

  for (const [compName, comp] of entries) {
    const method = comp.instanceMethods.find((m) => m.name === name);
    if (method)
      return {
        result: method,
        component: compName,
        source: 'instanceMethods',
      };

    const appMethod = comp.appMethods.find((m) => m.name === name);
    if (appMethod)
      return { result: appMethod, component: compName, source: 'appMethods' };
  }
  return null;
}

/**
 * Find a specific event by name, optionally scoped to a component
 */
export function findEvent(
  name: string,
  componentsData: ComponentsData,
  component?: string
): { result: EventItem; component: string; source: string } | null {
  const entries = component
    ? Object.entries(componentsData).filter(
        ([, comp]) =>
          normalizeComponentName(comp.dirName) ===
            normalizeComponentName(component) ||
          normalizeComponentName(comp.name) ===
            normalizeComponentName(component)
      )
    : Object.entries(componentsData);

  for (const [compName, comp] of entries) {
    const event = comp.events.find((e) => e.name === name);
    if (event)
      return { result: event, component: compName, source: 'events' };

    const domEvent = comp.domEvents.find((e) => e.name === name);
    if (domEvent)
      return { result: domEvent, component: compName, source: 'domEvents' };

    const appEvent = comp.appEvents.find((e) => e.name === name);
    if (appEvent)
      return { result: appEvent, component: compName, source: 'appEvents' };
  }
  return null;
}

/**
 * Normalize component name for matching (kebab-case, PascalCase, lowercase all match)
 */
function normalizeComponentName(name: string): string {
  return name.toLowerCase().replace(/[-_\s]/g, '');
}
