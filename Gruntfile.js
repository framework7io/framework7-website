'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
      jade: {
        options: {
          pretty: true,
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
