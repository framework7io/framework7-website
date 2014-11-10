'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
      jade: {
        options: {
          pretty: true,
        },
        index: {
          files: [{
            expand: true,
            cwd: './',
            src: ['*.jade'],
            dest: './',
            ext: '.html'
          }]
        },
        docs: {
          files: [{
            expand: true,
            cwd: 'docs/',
            src: ['*.jade'],
            dest: 'docs/',
            ext: '.html'
          }]
        },
        'docs-demos': {
          files: [{
            expand: true,
            cwd: 'docs-demos/',
            src: ['*.jade', '!_*.jade'],
            dest: 'docs-demos/',
            ext: '.html'
          }]
        },
        getStarted: {
          files: [{
            expand: true,
            cwd: 'get-started/',
            src: ['*.jade'],
            dest: 'get-started/',
            ext: '.html'
          }]
        },
        apps: {
          files: [{
            expand: true,
            cwd: 'apps/',
            src: ['*.jade'],
            dest: 'apps/',
            ext: '.html'
          }]
        },
        examples: {
          files: [{
            expand: true,
            cwd: 'examples/',
            src: ['*.jade'],
            dest: 'examples/',
            ext: '.html'
          }]
        },
        showcase: {
          files: [{
            expand: true,
            cwd: 'showcase/',
            src: ['*.jade'],
            dest: 'showcase/',
            ext: '.html'
          }]
        },
        tutorials: {
          files: [{
            expand: true,
            cwd: 'tutorials/',
            src: ['*.jade'],
            dest: 'tutorials/',
            ext: '.html'
          }]
        },
        contribute: {
          files: [{
            expand: true,
            cwd: 'contribute/',
            src: ['*.jade'],
            dest: 'contribute/',
            ext: '.html'
          }]
        },
        donate: {
          files: [{
            expand: true,
            cwd: 'donate/',
            src: ['*.jade'],
            dest: 'donate/',
            ext: '.html'
          }]
        },
        kitchenSink: {
          files: [{
            expand: true,
            cwd: 'kitchen-sink/jade',
            src: ['*.jade'],
            dest: 'kitchen-sink/',
            ext: '.html'
          }]
        },
      },
      less: {
        build: {
          files: [{
            expand: true,
            cwd: 'css/',
            src: ['*.less'],
            dest: 'css/',
            ext: '.css'
          }]
        }
      },
      watch: {
        index: {
          files: ['./*.jade'],
          tasks: ['newer:jade:index']
        },
        docs: {
          files: ['docs/*.jade'],
          tasks: ['newer:jade:docs']
        },
        'docs-demos': {
          files: ['docs-demos/*.jade'],
          tasks: ['newer:jade:docs-demos']
        },
        getStarted: {
          files: ['get-started/*.jade'],
          tasks: ['newer:jade:getStarted']
        },
        apps: {
          files: ['apps/*.jade'],
          tasks: ['newer:jade:apps']
        },
        examples: {
          files: ['examples/*.jade'],
          tasks: ['newer:jade:examples']
        },
        showcase: {
          files: ['showcase/*.jade'],
          tasks: ['newer:jade:showcase']
        },
        tutorials: {
          files: ['tutorials/*.jade'],
          tasks: ['newer:jade:tutorials']
        },
        contribute: {
          files: ['contribute/*.jade'],
          tasks: ['newer:jade:contribute']
        },
        donate: {
          files: ['donate/*.jade'],
          tasks: ['newer:jade:donate']
        },
        kitchenSinkJade: {
          files: ['kitchen-sink/jade/*.jade'],
          tasks: ['newer:jade:kitchenSink']
        },
        less: {
          files: ['css/*.less'],
          tasks: ['newer:less:build']
        },
      }
    });
    this.registerTask('default', ['jade']);
}
