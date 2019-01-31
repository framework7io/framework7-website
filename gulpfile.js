const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const path = require('path');

const buildStyles = require('./build/build-styles');
const buildPages = require('./build/build-pages');
const buildScript = require('./build/build-script');

/* ==================================================================
Build Styles
================================================================== */
gulp.task('less', buildStyles);
gulp.task('pug', buildPages);
gulp.task('js', buildScript);
gulp.task('build', gulp.series(['pug', 'less', 'js']));

/* =================================
Watch
================================= */
gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.*', gulp.series(['js']));
  gulp.watch('./src/less/**/*.*', gulp.series(['less']));
  gulp.watch('./src/pug/**/*.pug', { events: ['change'] }).on('change', (changedPath) => {
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

    buildPages(null, {
      src,
      dest: filePath.split('/')[0] === filePath ? './' : path.parse(filePath).dir,
    });
  });
});

/* =================================
Server
================================= */
gulp.task('connect', () => {
  return connect.server({
    root: ['./'],
    livereload: true,
    port: '3001',
  });
});

gulp.task('open', () => {
  return gulp.src('./index.html').pipe(open({ uri: 'http://localhost:3001/index.html' }));
});

gulp.task('server', gulp.parallel(['watch', 'connect', 'open']));

gulp.task('default', gulp.series(['server']));

gulp.task('test', gulp.series(['build']));
