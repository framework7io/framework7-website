const gulp = require('gulp');
const gulpData = require('gulp-data');
const gulpPug = require('gulp-pug');
const connect = require('gulp-connect');
const pug = require('pug');
const through2 = require('through2');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const iconsManifest = require('./manifest-icons.json');

const getSrcFileUrl = require('./utils/get-src-file-url');
const getYamlData = require('./utils/get-yaml-data');
const getJSONData = require('./utils/get-json-data');
const getSponsors = require('./utils/get-sponsors');
const inlineSvg = require('./utils/inline-svg');
const cssVars = require('./utils/css-vars');
const codeFilter = require('./utils/code-filter');
const codeInlineFilter = require('./utils/code-inline-filter');

const coreSourceFilter = require('./utils/core-source-filter');
const svelteSourceFilter = require('./utils/svelte-source-filter');
const vueSourceFilter = require('./utils/vue-source-filter');
const reactSourceFilter = require('./utils/react-source-filter');
const examplePreview = require('./utils/example-preview');

const createIndex = require('./utils/create-index');
const createMobilePreviewLinks = require('./utils/create-mobile-preview-links');
const createInlineCodeTags = require('./utils/create-inline-code-tags');
const createCodeFilter = require('./utils/create-code-filter');
const releaseNotes = require('./utils/release-notes');

const { releaseDate, version: releaseVersion } = require('../node_modules/framework7/package.json');

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

const docs = [];
const vue = [];
const svelte = [];
const react = [];

const cleanup = () => {
  const removeDocs = fs
    .readdirSync(path.resolve(__dirname, '../public/docs'))
    .filter((file) => file.includes('.html'))
    .filter((file) => docs.indexOf(file.split('.html')[0]) < 0);
  const removeVue = fs
    .readdirSync(path.resolve(__dirname, '../public/vue'))
    .filter((file) => file.includes('.html'))
    .filter((file) => vue.indexOf(file.split('.html')[0]) < 0);
  const removeReact = fs
    .readdirSync(path.resolve(__dirname, '../public/react'))
    .filter((file) => file.includes('.html'))
    .filter((file) => react.indexOf(file.split('.html')[0]) < 0);
  const removeSvelte = fs
    .readdirSync(path.resolve(__dirname, '../public/svelte'))
    .filter((file) => file.includes('.html'))
    .filter((file) => svelte.indexOf(file.split('.html')[0]) < 0);

  removeDocs.forEach((file) => {
    fs.unlinkSync(path.resolve(__dirname, `../public/docs/${file}`));
  });
  removeVue.forEach((file) => {
    fs.unlinkSync(path.resolve(__dirname, `../public/vue/${file}`));
  });
  removeReact.forEach((file) => {
    fs.unlinkSync(path.resolve(__dirname, `../public/react/${file}`));
  });
  removeSvelte.forEach((file) => {
    fs.unlinkSync(path.resolve(__dirname, `../public/svelte/${file}`));
  });
};

function buildPages(
  cb,
  {
    src = ['**/*.pug', '!**/_*.pug', '!_*.pug', '!docs-demos/svelte/*.pug'],
    dest = './public',
  } = {},
) {
  const cssHash = fs
    .readdirSync(path.resolve(__dirname, '../public/css'))
    .filter((f) => f.includes('main.'))[0]
    .split('.')[1];
  const jsHash = fs
    .readdirSync(path.resolve(__dirname, '../public/js'))
    .filter((f) => f.includes('main.') && !f.includes('main.js'))[0]
    .split('.')[1];
  const cdn = process.argv.slice(3)
    ? process.argv.slice(3).toString().replace('-', '') !== 'local'
    : true;
  const time = Date.now();
  const name = src[0] === '**/*.pug' ? 'all' : src.join(', ');
  const pretty = false;

  console.log(`Starting pug: ${name}`);

  const sep = path.sep;
  if (sep === '\\' && name !== 'all') {
    dest = `${dest.split('public\\')[0]}public\\`;
  }
  gulp
    .src(src, { cwd: 'src/pug' })
    .pipe(
      gulpData((file) => {
        if (file.path) {
          if (file.path.includes(`pug${sep}docs${sep}`))
            docs.push(file.path.split(`pug${sep}docs${sep}`)[1].split('.pug')[0]);
          if (file.path.includes(`pug${sep}vue${sep}`))
            vue.push(file.path.split(`pug${sep}vue${sep}`)[1].split('.pug')[0]);
          if (file.path.includes(`pug${sep}react${sep}`))
            react.push(file.path.split(`pug${sep}react${sep}`)[1].split('.pug')[0]);
          if (file.path.includes(`pug${sep}svelte${sep}`))
            svelte.push(file.path.split(`pug${sep}svelte${sep}`)[1].split('.pug')[0]);
        }
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
            version: releaseVersion,
            date: releaseDate,
          },
          cssHash,
          jsHash,
          cdn: cdn ? pkg.cdn : '',
          icons: iconsManifest.icons,
          getYamlData,
          getJSONData,
          getSponsors,
          inlineSvg,
          cssVars,
          releaseNotes,
          examplePreview,
        },
      }),
    )
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest(dest))
    .pipe(connect.reload())
    .on('end', () => {
      if (name === 'all') cleanup();
      console.log(`Finished pug ${name} in ${Date.now() - time}ms`);
      if (cb) cb();
    });
}

module.exports = buildPages;
