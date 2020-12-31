const path = require('path');
const pug = require('pug');
const fs = require('fs');

const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const css = require('rollup-plugin-css-only');
const vue = require('rollup-plugin-vue');
const Terser = require('terser');

const pugContent = fs.readFileSync('./src/pug/docs-demos/vue/_layout.pug', 'utf8');
const pugTemplate = pug.compile(pugContent);

function buildOne(name, cb) {
  if (name.indexOf('_') >= 0) {
    if (cb) cb();
    return Promise.resolve();
  }
  const time = Date.now();
  console.log(`Starting vue: ${name}`);

  const html = pugTemplate({
    F7_VUE_DEMO: name,
  });
  fs.writeFileSync(`./public/docs-demos/vue/${name}.html`, html);
  fs.writeFileSync(`./public/docs-demos/vue/${name}.css`, '');

  return rollup
    .rollup({
      input: './src/pug/docs-demos/vue/_main.js',
      treeshake: false,
      plugins: [
        replace({
          delimiters: ['', ''],
          F7_VUE_DEMO: name,
          'process.env.NODE_ENV': "'production'",
        }),
        vue({
          target: 'browser',
        }),
        css({
          output: `${name}.css`,
        }),
        nodeResolve({
          browser: true,
          dedupe: (importee) => importee === 'vue' || importee.startsWith('vue/'),
        }),
      ],
    })
    .then((bundle) => {
      return bundle.write({
        strict: true,
        file: `./public/docs-demos/vue/${name}.js`,
        format: 'umd',
        name,
        sourcemap: false,
      });
    })
    .then(async (bundle) => {
      const result = bundle.output[0];

      const minified = await Terser.minify(result.code);

      fs.writeFileSync(`./public/docs-demos/vue/${name}.js`, minified.code);

      console.log(`Finished vue: ${name} in ${Date.now() - time}ms`);
      if (cb) cb();
    });
}

async function buildAll(cb) {
  try {
    fs.readdirSync(path.resolve(__dirname, '../public/docs-demos/vue'))
      .filter(
        (file) =>
          (file.includes('.js') && !file.includes('.json')) ||
          file.includes('.css') ||
          file.includes('.html'),
      )
      .forEach((file) => {
        fs.unlinkSync(path.resolve(__dirname, `../public/docs-demos/vue/${file}`));
      });
  } catch (err) {
    // err happened
  }
  const vueDemos = fs
    .readdirSync(path.resolve(__dirname, '../src/pug/docs-demos/vue'))
    .filter((f) => f.indexOf('.vue') >= 0)
    .filter((f) => f.indexOf('_') < 0)
    .map((f) => f.split('.vue')[0]);

  // eslint-disable-next-line
  for (name of vueDemos) {
    // eslint-disable-next-line
    await buildOne(name);
  }
  if (cb) cb();
}

module.exports = {
  one: buildOne,
  all: buildAll,
};
