const path = require('path');
const pug = require('pug');
const fs = require('fs');

const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
// const terser = require('rollup-plugin-terser').terser;
// const babel = require('rollup-plugin-babel');
const svelte = require('rollup-plugin-svelte');

const pugContent = fs.readFileSync('./src/pug/docs-demos/svelte/_layout.pug', 'utf8');
const pugTemplate = pug.compile(pugContent);

function buildOne(name, cb) {
  if (name.indexOf('_') >= 0) {
    if (cb) cb();
    return Promise.resolve();
  }
  const time = Date.now();
  console.log(`Starting svelte: ${name}`);

  const html = pugTemplate({
    F7_SVELTE_DEMO: name,
  });
  fs.writeFileSync(`./public/docs-demos/svelte/${name}.html`, html);

  return rollup.rollup({
    input: './src/pug/docs-demos/svelte/_main.js',
    external: ['framework7'],
    plugins: [
      replace({
        delimiters: ['', ''],
        "from 'framework7-svelte'": `from '${path.resolve(__dirname, '../public/packages/svelte/framework7-svelte.esm.js')}'`,
        F7_SVELTE_DEMO: name,
      }),
      svelte({
        dev: false,
        css: (css) => {
          css.write(`./public/docs-demos/svelte/${name}.css`, false);
        },
      }),
      resolve({
        browser: true,
        dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
      }),
      // babel({
      //   extensions: ['.js', '.mjs', '.html', '.svelte'],
      // }),
      // terser(),
    ],
  }).then((bundle) => {
    return bundle.write({
      strict: true,
      file: `./public/docs-demos/svelte/${name}.js`,
      format: 'umd',
      name,
      sourcemap: false,
      globals: {
        framework7: 'Framework7',
      },
    });
  }).then(() => {
    console.log(`Finished svelte: ${name} in ${Date.now() - time}ms`);
    if (cb) cb();
  });
}

async function buildAll(cb) {
  const svelteDemos = fs.readdirSync(path.resolve(__dirname, '../src/pug/docs-demos/svelte'))
    .filter(f => f.indexOf('.svelte') >= 0)
    .filter(f => f.indexOf('_') < 0)
    .map(f => f.split('.svelte')[0]);

  // eslint-disable-next-line
  for (name of svelteDemos) {
    // eslint-disable-next-line
    await buildOne(name);
  }
  if (cb) cb();
}

module.exports = {
  one: buildOne,
  all: buildAll,
};
