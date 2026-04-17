const fs = require('fs');
const path = require('path');

const LOCAL_JSON = path.resolve(__dirname, '../src/pug/sponsors/sponsors.json');
const N4_JSON = path.resolve(__dirname, '../src/pug/sponsors/n4-sponsors.json');
const OUTPUT_JSON = path.resolve(__dirname, '../public/sponsors/sponsors.json');

function readJSON(file) {
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.warn(`[build-sponsors] Failed to parse ${file}: ${err.message}`);
    return [];
  }
}

module.exports = (cb) => {
  const local = readJSON(LOCAL_JSON);
  const n4 = readJSON(N4_JSON);
  const merged = [...n4, ...local];

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(merged, null, 2));
  if (cb) cb();
};
