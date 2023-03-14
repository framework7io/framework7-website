const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const path = require('path');

const buildStyles = require('./build/build-styles');
const buildPages = require('./build/build-pages');
const buildScript = require('./build/build-script');
const buildSponsors = require('./build/build-sponsors');

const buildCoreDemos = require('./build/build-core-demos');
const buildSvelteDemos = require('./build/build-svelte-demos');
const buildVueDemos = require('./build/build-vue-demos');
const buildReactDemos = require('./build/build-react-demos');

/* ==================================================================
Build Styles
================================================================== */
gulp.task('less', buildStyles);
gulp.task('sponsors', buildSponsors);
gulp.task('pug', buildPages);
gulp.task('js', buildScript);
gulp.task('core-demos', buildCoreDemos.all);
gulp.task('svelte-demos', buildSvelteDemos.all);
gulp.task('vue-demos', buildVueDemos.all);
gulp.task('react-demos', buildReactDemos.all);
gulp.task('build', gulp.series(['sponsors', 'pug', 'less', 'js']));
gulp.task('demos', gulp.series(['core-demos', 'svelte-demos', 'vue-demos', 'react-demos']));

/* =================================
Watch
================================= */
gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.*', gulp.series(['js']));
  gulp.watch('./src/less/**/*.*', gulp.series(['less']));
  gulp.watch('./src/pug/**/*.pug', { events: ['change'] }).on('change', (changedPath) => {
    const sep = String(path.sep);
    const filePath = changedPath.split(`src${sep}pug${sep}`)[1];
    if (filePath.indexOf(`docs-demos${sep}svelte`) >= 0) return;
    if (filePath.indexOf('_') === 0 || filePath.indexOf('_layout.pug') >= 0) {
      buildPages();
      return;
    }
    const src = [];

    if (filePath.split(sep)[1] && filePath.split(sep)[1].indexOf('_') === 0) {
      src.push(`${filePath.split(sep)[0]}${sep}*.pug`);
      src.push(`!${filePath.split(sep)[0]}${sep}_*.pug`);
    } else {
      src.push(filePath);
    }
    const dest =
      filePath.split(sep)[0] === filePath
        ? `.${sep}public${sep}`
        : `.${sep}public${sep}${path.parse(filePath).dir}`;
    buildPages(null, {
      src,
      dest,
    });
  });
  gulp.watch('./src/pug/**/*.f7.html', { events: ['change'] }).on('change', (changedPath) => {
    const sep = String(path.sep);
    const name = changedPath
      .split(`src${sep}pug${sep}docs-demos${sep}core${sep}`)[1]
      .split('.f7.html')[0];
    buildCoreDemos.one(name);
  });
  gulp.watch('./src/pug/**/*.svelte', { events: ['change'] }).on('change', (changedPath) => {
    const sep = String(path.sep);
    const name = changedPath
      .split(`src${sep}pug${sep}docs-demos${sep}svelte${sep}`)[1]
      .split('.svelte')[0];
    buildSvelteDemos.one(name);
  });
  gulp.watch('./src/pug/**/*.vue', { events: ['change'] }).on('change', (changedPath) => {
    const sep = String(path.sep);
    const name = changedPath
      .split(`src${sep}pug${sep}docs-demos${sep}vue${sep}`)[1]
      .split('.vue')[0];
    buildVueDemos.one(name);
  });
  gulp.watch('./src/pug/**/*.jsx', { events: ['change'] }).on('change', (changedPath) => {
    const sep = String(path.sep);
    const name = changedPath
      .split(`src${sep}pug${sep}docs-demos${sep}react${sep}`)[1]
      .split('.jsx')[0];
    buildReactDemos.one(name);
  });
});

/* =================================
Server
================================= */
gulp.task('connect', () => {
  return connect.server({
    root: ['./public/'],
    livereload: true,
    port: '3001',
  });
});

gulp.task('open', () => {
  return gulp.src('./public/index.html').pipe(open({ uri: 'http://localhost:3001/index.html' }));
});

// gulp.task('server', gulp.parallel(['watch', 'connect', 'open']));
gulp.task('server', gulp.parallel(['watch', 'connect']));

gulp.task('default', gulp.series(['server']));

gulp.task('test', gulp.series(['build']));
