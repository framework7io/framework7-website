(function(){
    'use strict';
    var gulp = require('gulp'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        less = require('gulp-less'),
        jade = require('gulp-jade'),
        path = require('path'),
        fs = require('fs'),
        del = require('del'),
        iconsManifest = require('./manifest-icons.json'),
        useCDN = true,
        cdnPath = '//cdn.framework7.io',
        sftp = require('gulp-sftp'),
        gutil = require( 'gulp-util' ),
        processVueJadeFiles = require('./src/react-doc-generation/vue-jade-file-processing').processVueJadeFiles,
        processReactHtmlFiles = require('./src/react-doc-generation/react-html-file-processing').processReactHtmlFiles,
        paths = {
            root: './',
            css: './css',
            js: './js',
            src: './src',
            jade: './src/jade',
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
                src: './src/jade/index.jade',
                dest: './'
            },
            apps: {
                src: './src/jade/apps/index.jade',
                dest: './apps/'
            },
            contribute: {
                src: './src/jade/contribute/index.jade',
                dest: './contribute/'
            },
            icons: {
                src: './src/jade/icons/index.jade',
                dest: './icons/'
            },
            docs: {
                src: './src/jade/docs/**/*.jade',
                dest: './docs/'
            },
            'docs-demos': {
                src: './src/jade/docs-demos/**/*.jade',
                dest: './docs-demos/'
            },
            donate: {
                src: './src/jade/donate/index.jade',
                dest: './donate/'
            },
            examples: {
                src: './src/jade/examples/index.jade',
                dest: './examples/'
            },
            'get-started': {
                src: './src/jade/get-started/index.jade',
                dest: './get-started/'
            },
            plugins: {
                src: './src/jade/plugins/index.jade',
                dest: './plugins/'
            },
            showcase: {
                src: './src/jade/showcase/index.jade',
                dest: './showcase/'
            },
            tutorials: {
                src: './src/jade/tutorials/**/*.jade',
                dest: './tutorials/'
            },
            vue: {
                src: './src/jade/vue/**/*.jade',
                dest: './vue/'
            },
            react: {
                src: './react-jade-temp/**/*.jade',
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

    // Jade Filter
    require('jade').filters['code'] = function (text) {
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
    var pagesJadeTasks = {};
    pageKeys.forEach(function (page) {
        pagesJadeTasks[page] = function (file) {
            var src = file ? file : pages[page].src;
            var fileName = '';
            if (file) {
                fileName = file.split('/')[file.split('/').length - 1];
            }
            console.log('Starting jade:' + page + ':' + fileName);
            var time = new Date().getTime();
            gulp.src(src)
                .pipe(jade({
                    pretty: true,
                    locals: {
                        cdn: useCDN ? cdnPath : '',
                        icons: iconsManifest.icons
                    }
                }))
                .pipe(gulp.dest(pages[page].dest))
                .on('end', function () {
                    connect.reload();
                    console.log('Finished jade:' + page + ':' + fileName + ' in ' + (new Date().getTime() - time) + 'ms');
                });
        }
        gulp.task('jade-' + page, function (cb) {
            checkIsLocal(process.argv.slice(3));
            pagesJadeTasks[page]()
        });
    });
    // All Jade Pages
    gulp.task('jade', function (cb) {
        processVueJadeFiles();
        checkIsLocal(process.argv.slice(3));
        var cbs = 0;
        pageKeys.forEach(function (page) {
            gulp.src(pages[page].src)
                .pipe(jade({
                    pretty: true,
                    locals: {
                        cdn: useCDN ? cdnPath : '',
                        icons: iconsManifest.icons
                    }
                }))
                .pipe(gulp.dest(pages[page].dest))
                .on('end', function () {
                    cbs ++;
                    if (cbs === pageKeys.length) {
                        connect.reload();
                        processReactHtmlFiles(cb);
                    }
                });
        });
    });

    gulp.task('process-html', function (cb) {
        processReactHtmlFiles(cb);
    });

    // Build All
    gulp.task('build', ['jade', 'less'], function (cb) {
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
            paths['ks-ios'] + '/jade',
            paths['ks-ios'] + '/less',
            paths['ks-material'] + '/jade',
            paths['ks-material'] + '/less',
        ];
        ['examples', 'apps', 'plugins'].forEach(function (folder) {
            toDelete.push(paths[folder] + '/**/**/*.jade');
            toDelete.push(paths[folder] + '/**/**/jade');
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
        pageKeys.forEach(function (page) {
            gulp.watch(pages[page].src, function (data) {
                if (page === 'docs' || page === 'vue') {
                    pagesJadeTasks[page](data.path);
                }
                else pagesJadeTasks[page]();
            });
        });
        gulp.watch([
                paths.jade + '/_vars.jade',
                paths.jade + '/_internal-template.jade',
                paths.jade + '/_footer.jade',
                paths.jade + '/_github_buttons.jade',
                paths.jade + '/_social-buttons.jade'
            ], ['jade']);
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
            'dist': './dist/**/*.*',
            'docs': './docs/**/*.*',
            'docs-demos': './docs/**/*.*',
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