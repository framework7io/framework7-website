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
        }
      },
      watch: {
        docs: {
          files: ['docs/*.jade'],
          tasks: ['newer:jade:docs']
        }
      }
    });
    this.registerTask('default', ['jade']);
}
