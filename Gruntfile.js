'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['*', 'assets/**', 'views/**'],
          dest: 'build/',
          filter: 'isFile'
        }]
      },
      htmldir: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['*', 'views/**'],
          dest: 'build/',
          filter: 'isFile'
        }]
      },
      assetsdir: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['assets/**'],
          dest: 'build/',
          filter: 'isFile'
        }]
      }
    },

    clean: {
      build: {
        src: [ 'build' ]
      },
    },

    sass: {
      dist: {
        files: {
          'app/css/style.css' : 'app/sass/*.scss'
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },

    jshint: {
      files: ['app/js/*.js'],
      options: { 
        jshintrc: '.jshintrc',
        globals: {  
           
        },
        ignores : []
      }
    },

    nodeunit: {
      files: ['test/**/*_test.js']
    },

    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['app/index.html']
      }
    },

    uglify: {
      build: {
        files: {
            'build/js/base.min.js': ['app/js/**/*.js']
        }
      }
    },

    lint: {
      all:['app/js/**/*.js']
    },

    connect: {
        options: {
          port: 6001,
          base: './build'
        },
        livereload: { // Live reload in the connect task
          options: {
             open: {
                  target: 'http://localhost:6001' // project local reference
             },
             base: [
                 './build' // compiled folder project
             ]
          }
        }
    },

    watch: {
      
      html: {
        files: ['app/index.html', 'app/views/*.html'],
        tasks: ['copy:htmldir'],
        options: {
          livereload: true
        }
      },

      js: {
        files: ['app/js/**/*.js'],
        tasks: ['js'],
        options: {
          livereload: true
        }
      },

      css: {
        files: ['app/sass/**/*.scss'],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      },

      assets: {
        files: ['app/assets/**'],
        tasks: ['copy:assetsdir'],
        options: {
          livereload: true
        }
      }
    },

    ftpush: {
      build: {
        auth: {
          host: 'victoriamineva.com',
          port: 21,
          authKey: 'key'
        },
        src: 'build',
        dest: '/public_html/testUpload',
        exclusions: ['build/**/.DS_Store', 'build/**/Thumbs.db', 'dist/tmp']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-ftpush');
  grunt.loadNpmTasks('grunt-ftp');

  // Default task(s).
  grunt.registerTask('default', ['build', 'css', 'js', 'html', 'connect', 'watch']);
  grunt.registerTask('build', ['clean', 'copy:main']);
  grunt.registerTask('js', ['jshint', 'uglify']);
  grunt.registerTask('css', ['sass', 'cssmin']);
  grunt.registerTask('html', ['htmlhint']);
  grunt.registerTask('upload', ['build', 'css', 'js', 'ftpush']);
  grunt.registerTask('download', ['ftpGet']);
};