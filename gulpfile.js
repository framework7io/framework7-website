var gulp = require('gulp');
var gulpData = require('gulp-data');
var connect = require('gulp-connect');
var open = require('gulp-open');
var gulpLess = require('gulp-less');
var less = require('less');
var gulpPug = require('gulp-pug');
var pug = require('pug');
var path = require('path');
var fs = require('fs');
var del = require('del');
var yaml = require('js-yaml');
var path = require('path');
var iconsManifest = require('./src/manifest-icons.json');
var useCDN = true;
var cdnPath = '//cdn.framework7.io';
var pkg = require('./package.json');
const highlight = require('./src/highlight');
const releaseMeta = require('./src/release-meta');

/* ==================================================================
Pug Helpers
================================================================== */

// Get src file url
function getSrcFileUrl(file) {
  const srcFileUrl = `${pkg.repository.url}/edit/master/src/pug/${file.path.split('/src/pug/')[1]}`;
  return {
    srcFileUrl: srcFileUrl,
  };
}

// Pug Filter
function codeFilter(code, { lang } = {}) {
  code = code
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  code = `<pre><code class="${lang || ''}">${highlight(code, lang)}</pre></code>`;
  return code;
}
pug.filters.code = codeFilter;
// Pug YAML Data
function getYamlData(ymlPath) {
  var doc = yaml.safeLoad(fs.readFileSync(`./src/pug/${ymlPath}`, 'utf8'));
  return doc;
}
function inlineSvg(svgPath) {
  return fs.readFileSync(svgPath, 'utf-8');
}

// FileContent
function getFileContent(path) {
  return fs.readFileSync(path, 'utf8');
}

function cssVarsCode(component) {
  const file = `./packages/core/components/${component}/${component}-vars.less`;
  if (!fs.existsSync(file)) return '';
  const content = fs.readFileSync(`./packages/core/components/${component}/${component}-vars.less`, 'utf8');
  if (!content || !content.trim().length) return '';
  let css;
  less.render(content, (err, output) => {
    css = output.css;
  });
  if (!css || !css.trim().length) return '';
  return `
    <h2>CSS Variables</h2>
    <p>Below is the list of related <a href="https://developer.mozilla.org/docs/Web/CSS/Using_CSS_variables" target="_blank" rel="nofollow">CSS variables</a> (CSS custom properties).</p>
    ${css.indexOf('/*') >= 0 ? `
    <div class="important-note">
      <p>Note that commented variables are not specified by default and their values is what they fallback to in this case.</p>
    </div>
    ` : ''}
    ${codeFilter(css, { lang: 'css' })}
  `;
}

/* ==================================================================
Check CDN
================================================================== */
function checkIsLocal(local) {
  if (local) local = local.toString().replace('-', '');
  if (local === 'local') {
    useCDN = false;
  }
}

/* ==================================================================
Pug Locals
================================================================== */
const pugLocals = () => {
  return {
    release: releaseMeta,
    cdn: useCDN ? cdnPath : '',
    icons: iconsManifest.icons,
    getYamlData,
    inlineSvg,
    getFileContent,
    cssVarsCode,
  }
}
/* ==================================================================
Build Styles
================================================================== */
gulp.task('less', function (cb) {
  var cbs = 0;
  gulp.src(['./src/less/main.less'])
    .pipe(gulpLess({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(connect.reload())
    .on('end', function () {
      if (cb) cb();
    });
});

/* ==================================================================
Build Pug Pages
================================================================== */
function buildPages(cb) {
  checkIsLocal(process.argv.slice(3));
  var cbs = 0;
  var time = Date.now();
  console.log(`Starting pug: all`);
  gulp.src(['**/*.pug', '!**/_*.pug', '!_*.pug'], { cwd: 'src/pug' })
    .pipe(gulpData(getSrcFileUrl))
    .pipe(gulpPug({
      pug,
      pretty: true,
      locals: pugLocals(),
    }))
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest('./'))
    .on('end', () => {
      console.log(`Finished pug all in ${Date.now() - time}ms`);
      if(cb) cb();
    });

}
gulp.task('pug', function (cb) {
  buildPages(cb);
});


/* ==================================================================
Build All
================================================================== */
gulp.task('build', gulp.series(['pug', 'less']), function (cb) {
  cb();
});

/* =================================
Watch
================================= */
gulp.task('watch', function () {
  checkIsLocal(process.argv.slice(3));

  gulp.watch('./src/less/**/*.*', gulp.series([ 'less' ]));
  gulp.watch('./src/pug/**/*.pug', { events: ['change'] }).on('change', (changedPath) => {
    checkIsLocal(process.argv.slice(3));
    const filePath = changedPath.split('src/pug/')[1];
    if (filePath.indexOf('_') === 0 || filePath.indexOf('_layout.pug') >= 0) {
      buildPages();
      return;
    }
    const src = [];

    if (filePath.split('/')[1] && filePath.split('/')[1].indexOf('_') === 0) {
      src.push(`${filePath.split('/')[0]}/*.pug`);
      src.push(`!${filePath.split('/')[0]}/_*.pug`);
    } else {
      src.push(filePath);
    }
    var time = Date.now();
    console.log(`Starting pug "${src}"`);
    gulp.src(src, { cwd: 'src/pug' })
      .pipe(gulpData(getSrcFileUrl))
      .pipe(gulpPug({
        pug,
        pretty: true,
        locals: pugLocals(),
      }))
      .on('error', (err) => {
        console.log(err);
      })
      .pipe(gulp.dest(filePath.split('/')[0] === filePath ? './' : path.parse(filePath).dir))
      .pipe(connect.reload())
      .on('end', () => {
        console.log(`Finished pug "${src}" in ${Date.now() - time}ms`);
      });
  });
});

/* =================================
Server
================================= */
gulp.task('connect', function () {
  return connect.server({
    root: [ './' ],
    livereload: true,
    port:'3000'
  });
});

gulp.task('open', function () {
  return gulp.src('./index.html').pipe(open({ uri: 'http://localhost:3000/index.html'}));
});

gulp.task('server', gulp.parallel([ 'watch', 'connect', 'open' ]));

gulp.task('default', gulp.series([ 'server' ]));

gulp.task('test', gulp.series([ 'build' ]));
