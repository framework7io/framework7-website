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
        useCDN = true,
        cdnPath = '//cdn.framework7.io',
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
                src: './src/jade/examples/plugins.jade',
                dest: './plugins/'
            },
            showcase: {
                src: './src/jade/showcase/index.jade',
                dest: './showcase/'
            },
            tutorials: {
                src: './src/jade/tutorials/**/*.jade',
                dest: './tutorials/'
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
    pageKeys.forEach(function (page) {
        gulp.task('jade-' + page, function (cb) {
            checkIsLocal(process.argv.slice(3));
            gulp.src(pages[page].src)
                .pipe(jade({
                    pretty: true,
                    locals: {
                        cdn: useCDN ? cdnPath : '',
                    }
                }))
                .pipe(gulp.dest(pages[page].dest))
                .on('end', function () {
                    connect.reload();
                    cb();
                });
        });
    });
    // All Jade Pages
    gulp.task('jade', function (cb) {
        checkIsLocal(process.argv.slice(3));
        var cbs = 0;
        pageKeys.forEach(function (page) {
            gulp.src(pages[page].src)
                .pipe(jade({
                    pretty: true,
                    locals: {
                        cdn: useCDN ? cdnPath : '',
                    }
                }))
                .pipe(gulp.dest(pages[page].dest))
                .on('end', function () {
                    cbs ++;
                    if (cbs === pageKeys.length) {
                        connect.reload();
                        cb();
                    }
                });
        });
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
            gulp.watch(pages[page].src, ['jade-' + page]);
        });
        gulp.watch(paths.jade + '/_docs-menu.jade', ['jade-docs']);
        gulp.watch([
                paths.jade + '/_vars.jade',
                paths.jade + '/_internal-template.jade',
                paths.jade + '/_footer.jade',
                paths.jade + '/_github_buttons.jade',
                paths.jade + '/_social-buttons.jade'
            ], ['jade']);
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