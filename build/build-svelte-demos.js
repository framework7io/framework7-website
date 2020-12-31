const path = require('path');
const pug = require('pug');
const fs = require('fs');
const Terser = require('terser');

const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const css = require('rollup-plugin-css-only');
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
  fs.writeFileSync(`./public/docs-demos/svelte/${name}.css`, '');

  return rollup
    .rollup({
      input: './src/pug/docs-demos/svelte/_main.js',
      treeshake: false,
      plugins: [
        replace({
          delimiters: ['', ''],
          F7_SVELTE_DEMO: name,
        }),
        svelte({
          emitCss: true,
          compilerOptions: {
            dev: false,
          },
        }),
        css({
          output: `${name}.css`,
        }),
        nodeResolve({
          browser: true,
          dedupe: (importee) => importee === 'svelte' || importee.startsWith('svelte/'),
        }),
      ],
    })
    .then((bundle) => {
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
    })
    .then(async (bundle) => {
      const result = bundle.output[0];

      const minified = await Terser.minify(result.code);

      fs.writeFileSync(`./public/docs-demos/svelte/${name}.js`, minified.code);

      console.log(`Finished svelte: ${name} in ${Date.now() - time}ms`);
      if (cb) cb();
    });
}

async function buildAll(cb) {
  try {
    fs.readdirSync(path.resolve(__dirname, '../public/docs-demos/svelte'))
      .filter(
        (file) =>
          (file.includes('.js') && !file.includes('.json')) ||
          file.includes('.css') ||
          file.includes('.html'),
      )
      .forEach((file) => {
        fs.unlinkSync(path.resolve(__dirname, `../public/docs-demos/svelte/${file}`));
      });
  } catch (err) {
    // err happened
  }
  const svelteDemos = fs
    .readdirSync(path.resolve(__dirname, '../src/pug/docs-demos/svelte'))
    .filter((f) => f.indexOf('.svelte') >= 0)
    .filter((f) => f.indexOf('_') < 0)
    .map((f) => f.split('.svelte')[0]);

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
