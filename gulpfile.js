(function(){
  'use strict';
  var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    less = require('gulp-less'),
    gulpPug = require('gulp-pug'),
    pug = require('pug'),
    path = require('path'),
    fs = require('fs'),
    del = require('del'),
    iconsManifest = require('./manifest-icons.json'),
    useCDN = true,
    cdnPath = '//cdn.framework7.io',
    sftp = require('gulp-sftp'),
    gutil = require( 'gulp-util' ),
    processVuePugFiles = require('./src/react-doc-generation/vue-pug-file-processing').processVuePugFiles,
    processReactHtmlFiles = require('./src/react-doc-generation/react-html-file-processing').processReactHtmlFiles;


  // Pug Filter
  pug.filters['code'] = function (text) {
    return text
    .replace( /</g, '&lt;'   )
    .replace( />/g, '&gt;'   )
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
  Build
  ================================================================== */
  // Styles
  gulp.task('less', function (cb) {
    var cbs = 0;
    gulp.src(['./src/less/main.less'])
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('./css/'))
      .pipe(connect.reload())
      .on('end', function () {
        if (cb) cb();
      });
  });

  // All Pug Pages
  function buildPages(cb) {
    // processVuePugFiles();
    checkIsLocal(process.argv.slice(3));
    var cbs = 0;
    var time = Date.now();
    console.log(`Starting pug: all`);
    gulp.src(['**/*.pug', '!**/_*.pug', '!react/*.pug', '!_*.pug'], { cwd: 'src/pug' })
      .pipe(gulpPug({
        pug,
        pretty: true,
        locals: {
          cdn: useCDN ? cdnPath : '',
          icons: iconsManifest.icons
        }
      }))
      .pipe(gulp.dest('./'))
      .on('end', () => {
        console.log(`Finished pug in ${Date.now() - time}ms`);
        if (cb) cb();
        connect.reload();
        // processReactHtmlFiles(cb);
      });
  }
  gulp.task('pug', function (cb) {
    buildPages(cb);
  });

  gulp.task('process-html', function (cb) {
    processReactHtmlFiles(cb);
  });

  // Build All
  gulp.task('build', ['pug', 'less'], function (cb) {
    cb();
  });
  gulp.task('build-local', function (cb) {
    local = true;
  });

  /* =================================
  Watch
  ================================= */
  gulp.task('watch', function () {
    checkIsLocal(process.argv.slice(3));

    gulp.watch('./src/less/**/*.*', [ 'less' ]);
    gulp.watch('./src/pug/**/*.pug', (data) => {
      checkIsLocal(process.argv.slice(3));
      if (data.type !== 'changed') return;
      const filePath = data.path.split('/src/pug/')[1];
      if (filePath.indexOf('react') === 0) return;
      if (filePath.indexOf('_') === 0) {
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
        .pipe(gulpPug({
          pug,
          pretty: true,
          locals: {
            cdn: useCDN ? cdnPath : '',
            icons: iconsManifest.icons
          }
        }))
        .pipe(gulp.dest(filePath.split('/')[0] === filePath ? './' : filePath.split('/')[0]))
        .on('end', () => {
          console.log(`Finished pug "${src}" in ${Date.now() - time}ms`);
          connect.reload();
        });
    });
  });
  /* =================================
  Deploy
  ================================= */
  gulp.task('deploy', function () {
    var folder;
    if (process.argv.slice(3)) {
      folder = process.argv.slice(3);
      if (folder) folder = folder.toString().replace('-', '');
    }
    var src = [
    './*.html',
    './robots.txt',
    './*.png',
    './framework7.json',
    './manifest-icons.json',
    './apps/**/*.*',
    './contribute/**/*.*',
    './css/**/*.*',
    './dist/**/*.*',
    './docs/**/*.*',
    './docs-demos/**/*.*',
    './donate/**/*.*',
    './examples/**/*.*',
    './fonts/**/*.*',
    './forum/**/*.*',
    './get-started/**/*.*',
    './i/**/*.*',
    './icons/**/*.*',
    './js/**/*.*',
    './kitchen-sink-ios/**/*.*',
    './kitchen-sink-material/**/*.*',
    './plugins/**/*.*',
    './showcase/**/*.*',
    './tutorials/**/*.*',
    './vue/**/*.*',
    './react/**/*.*'
    ];
    var folderSrc = {
      'index': './index.html',
      'apps': './apps/**/*.*',
      'dist': './dist/**/*.*',
      'docs': './docs/**/*.*',
      'docs-demos': './docs/**/*.*',
      'examples': './examples/**/*.*',
      'plugins': './plugins/**/*.*',
      'showcase': './showcase/**/*.*',
      'tutorials': './tutorials/**/*.*',
      'vue': './vue/**/*.*',
      'react': './react/**/*.*',
      'kitchen-sink': ['./kitchen-sink-ios/**/*.*', './kitchen-sink-material/**/*.*']
    };
    if (folder) src = folderSrc[folder];

    var remote = require('./remote.json');

    gulp.src(src, {base: './'})
      .pipe(sftp(remote));
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

  gulp.task('server', [ 'watch', 'connect', 'open' ]);

  gulp.task('default', [ 'server' ]);

  gulp.task('test', [ 'build' ]);
  })();
