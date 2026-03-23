import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import ts from 'typescript';
import less from 'less';

const require = createRequire(import.meta.url);
const LESS_MIXINS = require('./utils/less-mixins.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const F7_REPO = path.resolve(ROOT, '../framework7');
const F7_COMPONENTS = path.resolve(F7_REPO, 'src/core/components');
const DEMOS_DIR = path.resolve(ROOT, 'src/pug/docs-demos');
const DATA_DIR = path.resolve(ROOT, 'src/worker/mcp/data');
const MCP_DEMOS_DIR = path.resolve(ROOT, 'public/mcp-demos');

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function kebabToTitle(kebab) {
  return kebab
    .split(/[-_]/)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

function getJSDoc(node) {
  // Get JSDoc comment from a node
  const fullText = node.getSourceFile().getFullText();
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
  if (!ranges) return '';
  for (const range of ranges) {
    const comment = fullText.slice(range.pos, range.end);
    if (comment.startsWith('/**')) {
      return comment
        .replace(/^\/\*\*\s*/, '')
        .replace(/\s*\*\/$/, '')
        .replace(/^\s*\*\s?/gm, '')
        .trim();
    }
  }
  return '';
}

function typeToString(typeNode, sourceFile) {
  if (!typeNode) return 'any';
  return typeNode.getText(sourceFile);
}

function getDefaultFromJSDoc(jsDoc) {
  // Extract default value from JSDoc like "(default true)" or "(default 'auto')"
  const match = jsDoc.match(/\(default\s+(.+?)\)/i);
  return match ? match[1] : undefined;
}

// ──────────────────────────────────────────────
// Part 1: Component API extraction from .d.ts
// ──────────────────────────────────────────────

function extractMemberFromProperty(member, sourceFile) {
  const name = member.name?.getText(sourceFile);
  if (!name) return null;
  const jsDoc = getJSDoc(member);
  const type = member.type ? typeToString(member.type, sourceFile) : 'any';
  const optional = !!member.questionToken;
  const defaultValue = getDefaultFromJSDoc(jsDoc);
  return { name, type, description: jsDoc, optional, default: defaultValue };
}

function extractMemberFromMethod(member, sourceFile) {
  const name = member.name?.getText(sourceFile);
  if (!name) return null;
  const jsDoc = getJSDoc(member);
  const params = (member.parameters || []).map((p) => {
    const pDoc = getJSDoc(p);
    return {
      name: p.name.getText(sourceFile),
      type: p.type ? typeToString(p.type, sourceFile) : 'any',
      optional: !!p.questionToken || !!p.initializer,
      description: pDoc,
    };
  });
  const returnType = member.type ? typeToString(member.type, sourceFile) : 'void';
  return { name, description: jsDoc, parameters: params, returnType };
}

function extractInterfaceMembers(iface, sourceFile) {
  const properties = [];
  const methods = [];

  for (const member of iface.members || []) {
    if (
      ts.isPropertySignature(member) ||
      (ts.isPropertyDeclaration && ts.isPropertyDeclaration(member))
    ) {
      const prop = extractMemberFromProperty(member, sourceFile);
      if (prop) properties.push(prop);
    } else if (
      ts.isMethodSignature(member) ||
      (ts.isMethodDeclaration && ts.isMethodDeclaration(member))
    ) {
      const method = extractMemberFromMethod(member, sourceFile);
      if (method) methods.push(method);
    }
  }

  return { properties, methods };
}

function extractAppMethods(iface, sourceFile) {
  // AppMethods has a single property like `dialog: { create(...), ... }`
  const results = [];
  for (const member of iface.members || []) {
    if (ts.isPropertySignature(member) && member.type && ts.isTypeLiteralNode(member.type)) {
      const namespace = member.name?.getText(sourceFile);
      for (const sub of member.type.members || []) {
        if (ts.isMethodSignature(sub) || ts.isCallSignatureDeclaration(sub)) {
          const method = extractMemberFromMethod(sub, sourceFile);
          if (method) {
            method.namespace = namespace;
            results.push(method);
          }
        } else if (ts.isPropertySignature(sub)) {
          // Properties on the app method namespace (like view.current, view.main)
          const prop = extractMemberFromProperty(sub, sourceFile);
          if (prop) {
            prop.namespace = namespace;
            results.push(prop);
          }
        }
      }
    }
  }
  return results;
}

function extractAppParams(iface, sourceFile) {
  // AppParams has a property like `dialog?: { title?: string, ... } | undefined`
  const results = [];
  for (const member of iface.members || []) {
    if (ts.isPropertySignature(member)) {
      let typeNode = member.type;
      // Unwrap union with undefined: `{ ... } | undefined`
      if (typeNode && ts.isUnionTypeNode(typeNode)) {
        typeNode = typeNode.types.find((t) => !ts.isLiteralTypeNode(t) || t.literal.kind !== ts.SyntaxKind.UndefinedKeyword);
        if (!typeNode) typeNode = member.type;
      }
      if (typeNode && ts.isTypeLiteralNode(typeNode)) {
        for (const sub of typeNode.members || []) {
          const prop = extractMemberFromProperty(sub, sourceFile);
          if (prop) results.push(prop);
        }
      }
    }
  }
  return results;
}

function extractEvents(iface, sourceFile) {
  const events = [];
  for (const member of iface.members || []) {
    if (ts.isPropertySignature(member)) {
      const name = member.name?.getText(sourceFile);
      if (!name) continue;
      const jsDoc = getJSDoc(member);
      // Extract callback parameter info from the function type
      let params = [];
      if (member.type && ts.isFunctionTypeNode(member.type)) {
        params = member.type.parameters.map((p) => ({
          name: p.name.getText(sourceFile),
          type: p.type ? typeToString(p.type, sourceFile) : 'any',
          description: getJSDoc(p),
        }));
      }
      // Clean quotes from DomEvent names like 'dialog:open'
      const cleanName = name.replace(/^['"]|['"]$/g, '');
      events.push({ name: cleanName, description: jsDoc, parameters: params });
    }
  }
  return events;
}

function parseComponentDts(dirName) {
  const dtsFile =
    dirName === 'app'
      ? path.join(F7_COMPONENTS, dirName, 'app-class.d.ts')
      : path.join(F7_COMPONENTS, dirName, `${dirName}.d.ts`);

  if (!fs.existsSync(dtsFile)) return null;

  const content = fs.readFileSync(dtsFile, 'utf8');
  const sourceFile = ts.createSourceFile(dtsFile, content, ts.ScriptTarget.Latest, true);

  // Skip app-class.d.ts — it's the framework base, not a typical component
  if (dirName === 'app') {
    return extractAppComponent(sourceFile, content);
  }

  // Find the namespace declaration
  let namespaceName = null;
  let namespaceNode = null;

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isModuleDeclaration(node) && node.name) {
      namespaceName = node.name.text;
      namespaceNode = node;
    }
  });

  if (!namespaceName || !namespaceNode) return null;

  const result = {
    dirName,
    name: namespaceName,
    parameters: [],
    events: [],
    domEvents: [],
    appMethods: [],
    appParams: [],
    appEvents: [],
    instanceProperties: [],
    instanceMethods: [],
  };

  // Walk namespace body to find interfaces
  const body = namespaceNode.body;
  if (!body || !body.statements) return result;

  for (const stmt of body.statements) {
    if (!ts.isInterfaceDeclaration(stmt)) continue;
    const ifaceName = stmt.name.text;

    switch (ifaceName) {
      case 'Parameters': {
        const { properties } = extractInterfaceMembers(stmt, sourceFile);
        // Filter out 'on' and 'el' pattern properties that are standard
        result.parameters = properties.filter((p) => p.name !== 'on');
        break;
      }
      case 'Events': {
        result.events = extractEvents(stmt, sourceFile);
        break;
      }
      case 'DomEvents': {
        result.domEvents = extractEvents(stmt, sourceFile);
        break;
      }
      case 'AppMethods': {
        result.appMethods = extractAppMethods(stmt, sourceFile);
        break;
      }
      case 'AppParams': {
        result.appParams = extractAppParams(stmt, sourceFile);
        break;
      }
      case 'AppEvents': {
        result.appEvents = extractEvents(stmt, sourceFile);
        break;
      }
      default: {
        // Instance interface — same name as namespace (e.g., Dialog.Dialog, View.View)
        if (ifaceName === namespaceName) {
          const { properties, methods } = extractInterfaceMembers(stmt, sourceFile);
          result.instanceProperties = properties;
          result.instanceMethods = methods;
        }
        break;
      }
    }
  }

  return result;
}

function extractAppComponent(sourceFile, content) {
  // Special handling for app-class.d.ts — extract Framework7Parameters and Framework7Events
  const result = {
    dirName: 'app',
    name: 'App',
    parameters: [],
    events: [],
    domEvents: [],
    appMethods: [],
    appParams: [],
    appEvents: [],
    instanceProperties: [],
    instanceMethods: [],
  };

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node)) {
      const name = node.name.text;
      if (name === 'Framework7Parameters') {
        const { properties } = extractInterfaceMembers(node, sourceFile);
        result.parameters = properties.filter((p) => p.name !== 'on');
      } else if (name === 'Framework7Events') {
        result.events = extractEvents(node, sourceFile);
        result.appEvents = extractEvents(node, sourceFile);
      } else if (name === 'Framework7') {
        const { properties, methods } = extractInterfaceMembers(node, sourceFile);
        result.instanceProperties = properties;
        result.instanceMethods = methods;
      }
    }
  });

  return result;
}

function buildComponentsData() {
  const dirs = fs.readdirSync(F7_COMPONENTS).filter((d) => {
    if (d.startsWith('.')) return false;
    return fs.statSync(path.join(F7_COMPONENTS, d)).isDirectory();
  });

  const components = {};
  let parsed = 0;
  let skipped = 0;

  for (const dir of dirs) {
    const data = parseComponentDts(dir);
    if (data) {
      components[data.name] = data;
      parsed++;
    } else {
      skipped++;
    }
  }

  console.log(`  Components: ${parsed} parsed, ${skipped} skipped (no .d.ts or namespace)`);
  return components;
}

// ──────────────────────────────────────────────
// Part 2: CSS Variables extraction from -vars.less
// ──────────────────────────────────────────────

function parseCssToVariables(css) {
  // Parse the compiled CSS to extract variables grouped by scope
  const result = {
    root: [],
    ios: [],
    md: [],
    dark: [],
  };

  // Simple CSS parser: find selectors and their --f7-* declarations
  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
  let match;

  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const body = match[2].trim();
    if (!body) continue;

    const varRegex = /(--f7-[\w-]+)\s*:\s*([^;]+);/g;
    let varMatch;
    const vars = [];

    while ((varMatch = varRegex.exec(body)) !== null) {
      vars.push({ name: varMatch[1], value: varMatch[2].trim() });
    }

    if (vars.length === 0) continue;

    // Determine which scope bucket based on selector
    if (selector === ':root') {
      result.root.push(...vars);
    } else if (selector.includes('.ios') && selector.includes('.dark')) {
      // ios dark - tag as ios-dark
      vars.forEach((v) => (v.scope = 'dark'));
      result.ios.push(...vars);
    } else if (selector.includes('.md') && selector.includes('.dark')) {
      vars.forEach((v) => (v.scope = 'dark'));
      result.md.push(...vars);
    } else if (selector.includes('.ios')) {
      result.ios.push(...vars);
    } else if (selector.includes('.md')) {
      result.md.push(...vars);
    } else if (selector.includes('.dark')) {
      result.dark.push(...vars);
    } else {
      // Light/default scope vars
      result.root.push(...vars);
    }
  }

  return result;
}

async function extractCssVariables(dirName) {
  const varsFile = path.join(F7_COMPONENTS, dirName, `${dirName}-vars.less`);

  if (!fs.existsSync(varsFile)) return null;

  const content = fs.readFileSync(varsFile, 'utf8');
  if (!content || !content.trim()) return null;

  const lessInput = LESS_MIXINS + '\n' + content;

  try {
    const output = await less.render(lessInput);
    if (!output.css || !output.css.trim()) return null;
    return parseCssToVariables(output.css);
  } catch (err) {
    console.warn(`  Warning: Failed to compile LESS for ${dirName}: ${err.message}`);
    return null;
  }
}

async function buildCssVariablesData() {
  const dirs = fs.readdirSync(F7_COMPONENTS).filter((d) => {
    if (d.startsWith('.')) return false;
    return fs.statSync(path.join(F7_COMPONENTS, d)).isDirectory();
  });

  const cssVariables = {};
  let count = 0;

  for (const dir of dirs) {
    const vars = await extractCssVariables(dir);
    if (vars) {
      cssVariables[dir] = vars;
      count++;
    }
  }

  console.log(`  CSS variables: ${count} components with variables`);
  return cssVariables;
}

// ──────────────────────────────────────────────
// Part 3: Demo catalog
// ──────────────────────────────────────────────

function buildDemosData() {
  const frameworks = ['core', 'vue', 'react', 'svelte'];
  const catalog = {};

  for (const fw of frameworks) {
    const fwDir = path.join(DEMOS_DIR, fw);
    if (!fs.existsSync(fwDir)) continue;

    const files = fs.readdirSync(fwDir).filter((f) => {
      // Skip layout/helper files
      if (f.startsWith('_')) return false;
      // Include .f7.html for core, .js/.jsx/.vue/.svelte for frameworks
      return true;
    });

    for (const file of files) {
      // Determine slug from filename
      let slug;
      if (file.endsWith('.f7.html')) {
        slug = file.replace('.f7.html', '');
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        slug = file.replace(/\.(js|jsx)$/, '');
      } else if (file.endsWith('.vue')) {
        slug = file.replace('.vue', '');
      } else if (file.endsWith('.svelte')) {
        slug = file.replace('.svelte', '');
      } else {
        continue;
      }

      if (!catalog[slug]) {
        catalog[slug] = {
          slug,
          name: kebabToTitle(slug),
          frameworks: [],
        };
      }
      catalog[slug].frameworks.push(fw);
    }
  }

  const demos = Object.values(catalog).sort((a, b) => a.slug.localeCompare(b.slug));

  // Write individual demo JSON files for ASSETS fetching
  let fileCount = 0;
  for (const demo of demos) {
    for (const fw of demo.frameworks) {
      const fwDir = path.join(DEMOS_DIR, fw);
      // Find the demo file
      const possibleExts =
        fw === 'core'
          ? ['.f7.html']
          : ['.js', '.jsx', '.vue', '.svelte'];

      for (const ext of possibleExts) {
        const filePath = path.join(fwDir, demo.slug + ext);
        if (fs.existsSync(filePath)) {
          const source = fs.readFileSync(filePath, 'utf8');
          const outDir = path.join(MCP_DEMOS_DIR, demo.slug);
          fs.mkdirSync(outDir, { recursive: true });
          fs.writeFileSync(
            path.join(outDir, `${fw}.json`),
            JSON.stringify({ slug: demo.slug, framework: fw, source }),
          );
          fileCount++;
          break;
        }
      }
    }
  }

  console.log(`  Demos: ${demos.length} demos, ${fileCount} files written to public/mcp-demos/`);
  return demos;
}

// ──────────────────────────────────────────────
// Main: write output files
// ──────────────────────────────────────────────

async function main() {
  console.log('Building MCP data...\n');

  // Validate framework7 repo exists
  if (!fs.existsSync(F7_COMPONENTS)) {
    console.error(
      `Error: Framework7 repo not found at ${F7_REPO}\n` +
        'Make sure the framework7 repo is cloned as a sibling directory.',
    );
    process.exit(1);
  }

  // Ensure output directories exist
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(MCP_DEMOS_DIR, { recursive: true });

  // 1. Components
  console.log('1. Extracting component API data from .d.ts files...');
  const componentsData = buildComponentsData();

  // 2. CSS Variables
  console.log('2. Extracting CSS variables from -vars.less files...');
  const cssVariablesData = await buildCssVariablesData();

  // 3. Demos
  console.log('3. Building demo catalog...');
  const demosData = buildDemosData();

  // Write TypeScript data files
  console.log('\nWriting data files...');

  fs.writeFileSync(
    path.join(DATA_DIR, 'components.ts'),
    `// Auto-generated by build/build-mcp-data.mjs — do not edit\nexport const componentsData = ${JSON.stringify(componentsData, null, 2)} as const;\n`,
  );
  console.log(`  -> src/worker/mcp/data/components.ts`);

  fs.writeFileSync(
    path.join(DATA_DIR, 'css-variables.ts'),
    `// Auto-generated by build/build-mcp-data.mjs — do not edit\nexport const cssVariablesData = ${JSON.stringify(cssVariablesData, null, 2)} as const;\n`,
  );
  console.log(`  -> src/worker/mcp/data/css-variables.ts`);

  fs.writeFileSync(
    path.join(DATA_DIR, 'demos.ts'),
    `// Auto-generated by build/build-mcp-data.mjs — do not edit\nexport const demosData = ${JSON.stringify(demosData, null, 2)} as const;\n`,
  );
  console.log(`  -> src/worker/mcp/data/demos.ts`);

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
