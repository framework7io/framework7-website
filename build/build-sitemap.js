const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://framework7.io';
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Mirror robots.txt Disallow rules so the sitemap only advertises indexable URLs.
const EXCLUDED_DIRS = new Set(['packages', 'kitchen-sink', 'docs-demos']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const rel = path.relative(PUBLIC_DIR, full).split(path.sep)[0];
      if (EXCLUDED_DIRS.has(rel)) continue;
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function toCanonicalUrl(filePath) {
  const rel = path.relative(PUBLIC_DIR, filePath).split(path.sep).join('/');
  if (rel === 'index.html') return `${SITE_ORIGIN}/`;
  if (rel.endsWith('/index.html')) {
    return `${SITE_ORIGIN}/${rel.slice(0, -'index.html'.length)}`;
  }
  return `${SITE_ORIGIN}/${rel}`;
}

function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemap(cb) {
  const time = Date.now();
  console.log('Starting sitemap');

  const files = walk(PUBLIC_DIR).sort();
  const urls = Array.from(new Set(files.map(toCanonicalUrl))).sort();

  const today = new Date().toISOString().slice(0, 10);
  const body = urls
    .map((url) => `  <url>\n    <loc>${xmlEscape(url)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);

  console.log(`Finished sitemap (${urls.length} urls) in ${Date.now() - time}ms`);
  if (cb) cb();
}

module.exports = buildSitemap;

if (require.main === module) {
  buildSitemap();
}
