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
        }
      }
    });
    this.registerTask('default', ['jade']);
}
