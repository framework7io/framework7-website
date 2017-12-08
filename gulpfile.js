(function(){
  'use strict';
  var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    less = require('gulp-less'),
    pug = require('gulp-pug'),
    path = require('path'),
    fs = require('fs'),
    del = require('del'),
    iconsManifest = require('./manifest-icons.json'),
    useCDN = true,
    cdnPath = '//cdn.framework7.io',
    sftp = require('gulp-sftp'),
    gutil = require( 'gulp-util' ),
    processVuePugFiles = require('./src/react-doc-generation/vue-pug-file-processing').processVuePugFiles,
    processReactHtmlFiles = require('./src/react-doc-generation/react-html-file-processing').processReactHtmlFiles,
    paths = {
      root: './',
      css: './css',
      js: './js',
      src: './src',
      pug: './src/pug',
      less: './src/less',
      'ks-ios': './kitchen-sink-ios',
      'ks-material': './kitchen-sink-material',
      plugins: './plugins',
      examples: './examples',
      apps: './apps',
      vue: './vue',
      react: './react'
    },
    pages = {
      home: {
        src: './src/pug/index.pug',
        dest: './'
      },
      apps: {
        src: './src/pug/apps/index.pug',
        dest: './apps/'
      },
      contribute: {
        src: './src/pug/contribute/index.pug',
        dest: './contribute/'
      },
      icons: {
        src: './src/pug/icons/index.pug',
        dest: './icons/'
      },
      docs: {
        src: './src/pug/docs/**/*.pug',
        dest: './docs/'
      },
      'docs-demos': {
        src: './src/pug/docs-demos/**/*.pug',
        dest: './docs-demos/'
      },
      donate: {
        src: './src/pug/donate/index.pug',
        dest: './donate/'
      },
      examples: {
        src: './src/pug/examples/index.pug',
        dest: './examples/'
      },
      'get-started': {
        src: './src/pug/get-started/index.pug',
        dest: './get-started/'
      },
      plugins: {
        src: './src/pug/plugins/index.pug',
        dest: './plugins/'
      },
      showcase: {
        src: './src/pug/showcase/index.pug',
        dest: './showcase/'
      },
      tutorials: {
        src: './src/pug/tutorials/**/*.pug',
        dest: './tutorials/'
      },
      vue: {
        src: './src/pug/vue/**/*.pug',
        dest: './vue/'
      },
      react: {
        src: './react-pug-temp/**/*.pug',
        dest: './react/'
      }
    },
    pageKeys = [],
    styles = [
      {
        src: './src/less/main.less',
        dest: './css/'
      }
    ];

  for (var page in pages) {
    if(pages.hasOwnProperty(page)) pageKeys.push(page);
  }

    // Pug Filter
    require('pug').filters['code'] = function (text) {
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
      styles.forEach(function (style) {
        gulp.src([style.src])
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(style.dest))
        .pipe(connect.reload())
        .on('end', function () {
          cbs ++;
          if (cbs === styles.length) cb();
        });
      });
    });
    // By Sections
    var pagesPugTasks = {};
    pageKeys.forEach(function (page) {
      pagesPugTasks[page] = function (file) {
        var src = file ? file : pages[page].src;
        var fileName = '';
        if (file) {
          fileName = file.split('/')[file.split('/').length - 1];
        }
        console.log('Starting pug:' + page + ':' + fileName);
        var time = new Date().getTime();
        gulp.src(src)
        .pipe(pug({
          pug: require('pug'),
          pretty: true,
          locals: {
            cdn: useCDN ? cdnPath : '',
            icons: iconsManifest.icons
          }
        }))
        .pipe(gulp.dest(pages[page].dest))
        .on('end', function () {
          connect.reload();
          console.log('Finished pug:' + page + ':' + fileName + ' in ' + (new Date().getTime() - time) + 'ms');
        });
      }
      gulp.task('pug-' + page, function (cb) {
        checkIsLocal(process.argv.slice(3));
        pagesPugTasks[page]()
      });
    });
    // All Pug Pages
    gulp.task('pug', function (cb) {
      // processVuePugFiles();
      checkIsLocal(process.argv.slice(3));
      var cbs = 0;
      gulp.src(['./src/pug/**/*.pug', './src/pug/**/!_*.pug'], { cwd: 'src/pug/' })
        .pipe()
        .pipe(pug({
          pug: require('pug'),
          pretty: true,
          locals: {
            cdn: useCDN ? cdnPath : '',
            icons: iconsManifest.icons
          }
        }))
        .pipe(gulp.dest('./'));
      // pageKeys.forEach(function (page) {
      //   gulp.src(pages[page].src)
      //     .pipe(pug({
      //       pug: require('pug'),
      //       pretty: true,
      //       locals: {
      //         cdn: useCDN ? cdnPath : '',
      //         icons: iconsManifest.icons
      //       }
      //     }))
      //     .pipe(gulp.dest(pages[page].dest))
      //     .on('end', function () {
      //       cbs ++;
      //       if (cbs === pageKeys.length) {
      //         connect.reload();
      //         // processReactHtmlFiles(cb);
      //       }
      //     });
      // });
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
    Clean Kitchen Sink
    ================================= */
    gulp.task('clean', function (cb) {
      var toDelete = [
      paths['ks-ios'] + '/pug',
      paths['ks-ios'] + '/less',
      paths['ks-material'] + '/pug',
      paths['ks-material'] + '/less',
      ];
      ['examples', 'apps', 'plugins'].forEach(function (folder) {
        toDelete.push(paths[folder] + '/**/**/*.pug');
        toDelete.push(paths[folder] + '/**/**/pug');
        toDelete.push(paths[folder] + '/**/**/*.less');
        toDelete.push(paths[folder] + '/**/**/less');
      });
      del(toDelete).then(function () {
        cb();
      });
    });
    /* =================================
    Watch
    ================================= */
    gulp.task('watch', function () {
      checkIsLocal(process.argv.slice(3));

      gulp.watch(paths.less + '**/*.*', [ 'less' ]);
      gulp.watch('./src/pug/**/*.pug', (data) => {
        if (data.type !== 'changed') return;
        const filePath = data.path.split('/src/pug/')[1];
        console.log(filePath);
      });
      // pageKeys.forEach(function (page) {
      //   gulp.watch(pages[page].src, function (data) {
      //     if (page === 'docs' || page === 'vue') {
      //       pagesPugTasks[page](data.path);
      //     }
      //     else pagesPugTasks[page]();
      //   });
      // });
      // gulp.watch([
      //   paths.pug + '/_vars.pug',
      //   paths.pug + '/_internal-template.pug',
      //   paths.pug + '/_footer.pug',
      //   paths.pug + '/_github_buttons.pug',
      //   paths.pug + '/_social-buttons.pug'
      //   ], ['pug']);
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
        root: [ paths.root ],
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
