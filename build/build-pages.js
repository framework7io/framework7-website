const gulp = require('gulp');
const gulpData = require('gulp-data');
const gulpPug = require('gulp-pug');
const connect = require('gulp-connect');
const pug = require('pug');
const through2 = require('through2');

const pkg = require('../package.json');
const iconsManifest = require('./manifest-icons.json');

const getSrcFileUrl = require('./utils/get-src-file-url');
const getYamlData = require('./utils/get-yaml-data');
const inlineSvg = require('./utils/inline-svg');
const cssVars = require('./utils/css-vars');
const codeFilter = require('./utils/code-filter');
const codeInlineFilter = require('./utils/code-inline-filter');
const createIndex = require('./utils/create-index');
const createMobilePreviewLinks = require('./utils/create-mobile-preview-links');

if (!pug.filter && !pug.filters.code) {
  pug.filters = {
    code: codeFilter,
    code_inline: codeInlineFilter,
  };
}

function buildPages(cb, { src = ['**/*.pug', '!**/_*.pug', '!_*.pug'], dest = './' } = {}) {
  const cdn = process.argv.slice(3) ? process.argv.slice(3).toString().replace('-', '') !== 'local' : true;
  const time = Date.now();

  const name = src[0] === '**/*.pug' ? 'all' : src.join(', ');

  console.log(`Starting pug: ${name}`);

  gulp.src(src, { cwd: 'src/pug' })
    .pipe(gulpData((file) => { return { srcFileUrl: getSrcFileUrl(file) }; }))
    .pipe(through2.obj((file, _, cbInternal) => {
      if (file.isBuffer()) {
        let content = file.contents.toString();
        content = createIndex(content, file.path);
        content = createMobilePreviewLinks(content, file.path);
        file.contents = Buffer.from(content);
      }
      cbInternal(null, file);
    }))
    .pipe(gulpPug({
      pug,
      pretty: false,
      locals: {
        release: {
          version: pkg.releaseVersion,
          date: pkg.releaseDate,
        },
        cdn: cdn ? pkg.cdn : '',
        icons: iconsManifest.icons,
        getYamlData,
        inlineSvg,
        cssVars,
      },
    }))
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest(dest))
    .pipe(connect.reload())
    .on('end', () => {
      console.log(`Finished pug ${name} in ${Date.now() - time}ms`);
      if (cb) cb();
    });
}

module.exports = buildPages;
