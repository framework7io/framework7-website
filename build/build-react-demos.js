const path = require('path');
const pug = require('pug');
const fs = require('fs');

const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { babel } = require('@rollup/plugin-babel');
const css = require('rollup-plugin-css-only');
const commonjs = require('@rollup/plugin-commonjs');
const Terser = require('terser');

const pugContent = fs.readFileSync('./src/pug/docs-demos/react/_layout.pug', 'utf8');
const pugTemplate = pug.compile(pugContent);

function buildOne(name, cb) {
  if (name.indexOf('_') >= 0) {
    if (cb) cb();
    return Promise.resolve();
  }
  const time = Date.now();
  console.log(`Starting react: ${name}`);

  const html = pugTemplate({
    F7_REACT_DEMO: name,
  });
  fs.writeFileSync(`./public/docs-demos/react/${name}.html`, html);
  fs.writeFileSync(`./public/docs-demos/react/${name}.css`, '');

  return rollup
    .rollup({
      input: './src/pug/docs-demos/react/_main.js',
      treeshake: false,
      plugins: [
        replace({
          delimiters: ['', ''],
          F7_REACT_DEMO: name,
          'process.env.NODE_ENV': "'production'",
        }),
        css({
          output: `${name}.css`,
        }),
        nodeResolve({
          browser: true,
          // dedupe: (importee) => importee === 'react' || importee.startsWith('react/'),
        }),
        commonjs(),
        babel({
          presets: ['@babel/preset-react'],
          configFile: false,
          babelHelpers: 'bundled',
        }),
      ],
    })
    .then((bundle) => {
      return bundle.write({
        strict: true,
        file: `./public/docs-demos/react/${name}.js`,
        format: 'umd',
        name,
        sourcemap: false,
      });
    })
    .then(async (bundle) => {
      const result = bundle.output[0];

      const minified = await Terser.minify(result.code);

      fs.writeFileSync(`./public/docs-demos/react/${name}.js`, minified.code);

      console.log(`Finished react: ${name} in ${Date.now() - time}ms`);
      if (cb) cb();
    });
}

async function buildAll(cb) {
  try {
    fs.readdirSync(path.resolve(__dirname, '../public/docs-demos/react'))
      .filter((file) => file.includes('.js') || file.includes('.css') || file.includes('.html'))
      .forEach((file) => {
        fs.unlinkSync(path.resolve(__dirname, `../public/docs-demos/react/${file}`));
      });
  } catch (err) {
    // err happened
  }
  const reactDemos = fs
    .readdirSync(path.resolve(__dirname, '../src/pug/docs-demos/react'))
    .filter((f) => f.indexOf('.jsx') >= 0)
    .filter((f) => f.indexOf('_') < 0)
    .map((f) => f.split('.jsx')[0]);

  // eslint-disable-next-line
  for (name of reactDemos) {
    // eslint-disable-next-line
    await buildOne(name);
  }
  if (cb) cb();
}

module.exports = {
  one: buildOne,
  all: buildAll,
};
