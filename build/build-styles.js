const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const gulp = require('gulp');
const gulpLess = require('gulp-less');
const connect = require('gulp-connect');
const cleanCss = require('gulp-clean-css');

function buildLess(cb) {
  fs.readdirSync('./public/css').forEach((f) => {
    if (f.includes('main')) {
      fs.unlinkSync(`./public/css/${f}`);
    }
  });
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
      const content = fs.readFileSync(path.resolve(__dirname, '../public/css/main.css'));
      const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 6);
      fs.renameSync(
        path.resolve(__dirname, '../public/css/main.css'),
        path.resolve(__dirname, `../public/css/main.${hash}.css`),
      );
      if (cb) cb();
    });
}

module.exports = buildLess;
