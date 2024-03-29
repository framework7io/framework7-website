const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const Terser = require('terser');
const replace = require('@rollup/plugin-replace');

function build(cb) {
  const jsFolder = path.resolve(__dirname, '../public/js');

  fs.readdirSync(jsFolder).forEach((f) => {
    if (f.includes('main')) {
      fs.unlinkSync(`${jsFolder}/${f}`);
    }
  });
  rollup
    .rollup({
      input: './src/js/main.js',
      plugins: [
        nodeResolve(),
        babel({
          babelHelpers: 'bundled',
        }),
        replace({
          delimiters: ['', ''],
          'process.env.NODE_ENV': "'production'",
        }),
      ],
    })
    .then((bundle) => {
      return bundle.write({
        strict: true,
        file: `${jsFolder}/main.js`,
        format: 'umd',
        name: 'app',
        sourcemap: true,
        sourcemapFile: `${jsFolder}/main.js.map`,
      });
    })
    .then(async (bundle) => {
      const result = bundle.output[0];
      const hash = crypto.createHash('md5').update(result.code).digest('hex').slice(0, 6);

      const minified = await Terser.minify(result.code, {
        sourceMap: {
          content: result.map,
          url: `main.${hash}.js.map`,
        },
      });

      fs.writeFileSync(`${jsFolder}/main.${hash}.js`, minified.code);
      fs.writeFileSync(`${jsFolder}/main.${hash}.js.map`, minified.map);

      cb();
    })
    .catch((err) => {
      cb();
      console.log(err);
    });
}

module.exports = build;
