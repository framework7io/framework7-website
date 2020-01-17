const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const path = require('path');

const buildStyles = require('./build/build-styles');
const buildPages = require('./build/build-pages');
const buildScript = require('./build/build-script');

const buildSvelteDemos = require('./build/build-svelte-demos');

/* ==================================================================
Build Styles
================================================================== */
gulp.task('less', buildStyles);
gulp.task('pug', buildPages);
gulp.task('js', buildScript);
gulp.task('svelte', buildSvelteDemos.all);
gulp.task('build', gulp.series(['pug', 'less', 'js', 'svelte']));

/* =================================
Watch
================================= */
gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.*', gulp.series(['js']));
  gulp.watch('./src/less/**/*.*', gulp.series(['less']));
  gulp.watch('./src/pug/**/*.pug', { events: ['change'] }).on('change', (changedPath) => {
    const filePath = changedPath.split('src/pug/')[1];
    if (filePath.indexOf('docs-demos/svelte') >= 0) return;
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
    const dest = filePath.split('/')[0] === filePath
      ? './public/'
      : `./public/${path.parse(filePath).dir}`;
    buildPages(null, {
      src,
      dest,
    });
  });
  gulp.watch('./src/pug/**/*.svelte', { events: ['change'] }).on('change', (changedPath) => {
    const name = changedPath.split('src/pug/docs-demos/svelte/')[1].split('.svelte')[0];
    buildSvelteDemos.one(name);
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

gulp.task('server', gulp.parallel(['watch', 'connect', 'open']));

gulp.task('default', gulp.series(['server']));

gulp.task('test', gulp.series(['build']));
