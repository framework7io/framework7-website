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
        }
      }
    });
    this.registerTask('default', ['jade']);
}
