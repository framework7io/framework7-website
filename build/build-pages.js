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
const coreSourceFilter = require('./utils/core-source-filter');
const svelteSourceFilter = require('./utils/svelte-source-filter');
const vueSourceFilter = require('./utils/vue-source-filter');
const reactSourceFilter = require('./utils/react-source-filter');
const codeInlineFilter = require('./utils/code-inline-filter');
const createIndex = require('./utils/create-index');
const createMobilePreviewLinks = require('./utils/create-mobile-preview-links');
const createInlineCodeTags = require('./utils/create-inline-code-tags');
const createCodeFilter = require('./utils/create-code-filter');
const releaseNotes = require('./utils/release-notes');

if (!pug.filter && !pug.filters.code) {
  pug.filters = {
    coreSource: coreSourceFilter,
    svelteSource: svelteSourceFilter,
    vueSource: vueSourceFilter,
    reactSource: reactSourceFilter,
    code: codeFilter,
    code_inline: codeInlineFilter,
  };
}

function buildPages(
  cb,
  {
    src = ['**/*.pug', '!**/_*.pug', '!_*.pug', '!docs-demos/svelte/*.pug'],
    dest = './public',
  } = {},
) {
  const cdn = process.argv.slice(3)
    ? process.argv.slice(3).toString().replace('-', '') !== 'local'
    : true;
  const time = Date.now();

  const name = src[0] === '**/*.pug' ? 'all' : src.join(', ');

  let pretty = false;
  if (
    src[0] &&
    src[0].indexOf('docs-demos/core') >= 0 &&
    (src[0].indexOf('-f7') >= 0 || src[0].indexOf('.f7') >= 0)
  ) {
    pretty = true;
    dest = './src/pug/docs-demos/core';
  }

  console.log(`Starting pug: ${name}`);

  gulp
    .src(src, { cwd: 'src/pug' })
    .pipe(
      gulpData((file) => {
        return { srcFileUrl: getSrcFileUrl(file) };
      }),
    )
    .pipe(
      through2.obj((file, _, cbInternal) => {
        if (file.isBuffer()) {
          let content = file.contents.toString();
          content = createIndex(content, file.path);
          content = createMobilePreviewLinks(content, file.path);
          content = createCodeFilter(content);
          content = createInlineCodeTags(content);
          file.contents = Buffer.from(content);
        }
        cbInternal(null, file);
      }),
    )
    .pipe(
      gulpPug({
        pug,
        pretty,
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
          releaseNotes,
        },
      }),
    )
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
