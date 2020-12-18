const path = require('path');
const gulp = require('gulp');
const gulpLess = require('gulp-less');
const connect = require('gulp-connect');
const cleanCss = require('gulp-clean-css');

function buildLess(cb) {
  gulp
    .src(['./src/less/main.less'])
    .pipe(
      gulpLess({
        paths: [path.join(__dirname, 'less', 'includes')],
      }),
    )
    .pipe(cleanCss({ compatibility: '*,-properties.zeroUnits', level: 2 }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload())
    .on('end', () => {
      if (cb) cb();
    });
}

module.exports = buildLess;
