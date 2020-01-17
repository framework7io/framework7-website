const fs = require('fs');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const Terser = require('terser');

function build(cb) {
  rollup.rollup({
    input: './src/js/main.js',
    plugins: [
      resolve(),
      babel(),
    ],
  }).then((bundle) => {
    return bundle.write({
      strict: true,
      file: './public/js/main.js',
      format: 'umd',
      name: 'app',
      sourcemap: true,
      sourcemapFile: './public/js/main.js.map',
    });
  }).then((bundle) => {
    const result = bundle.output[0];

    const minified = Terser.minify(result.code, {
      sourceMap: {
        content: result.map,
        url: 'main.js.map',
      },
    });

    fs.writeFileSync('./public/js/main.js', minified.code);
    fs.writeFileSync('./public/js/main.js.map', minified.map);

    cb();
  }).catch((err) => {
    cb();
    console.log(err);
  });
}

module.exports = build;
