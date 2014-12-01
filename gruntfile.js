module.exports = function(grunt) {
  // 'use strict';

  // 配置任务和插件
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // 清除 dist 文件夹
    clean: ['dist/'],

    // 编译 stylus
    stylus: {
      compile: {
        options: {
          compress: false,
          // 指定要扫描的目录（针对 @import 内的路径）
          paths: ['src/css'],
          // use embedurl('test.png') in our code to trigger Data URI embedding
          // 指定将图片路径转成 base64 数据的函数
          urlfunc: 'embedurl'
          // // use stylus plugin at compile time
          // use: [
          //   require('fluidity')
          // ],
          // //  @import 'foo', 'bar/moo', etc. into every .styl file
          // import: [
          //   'foo',
          //   'bar/moo'
          // ]
        },
        // files: {
        //   'path/to/result.css': 'path/to/source.styl', // 1:1 compile
        //   'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile and concat into single file
        // }
        files: [{
          expand: true,
          cwd: 'src/css',
          src: '*.styl',
          dest: 'src/css',
          ext: '.css'
        }]
      }
    },

    // 压缩 CSS 文件
    cssmin: {
      options: {
        report: 'gzip'
      },
      combine: {
        files: {
          'src/css/main.css': 'src/css/main-debug.css'
        }
      }
      // minify: {
      //   expand: true,
      //   cwd: 'css/',
      //   src: ['*-debug.css'],
      //   dest: 'css/',
      //   ext: '.css'
      // }
    },

    // 压缩合并 JS 文件
    uglify: {
      options: {
        report: 'gzip',
        mangle: true, // Specify mangle: false to prevent changes to your variable and function names.
        banner: '/*! <%= pkg.name %> by <%= pkg.author %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      beautify: {
         ascii_only: true // 中文 ascii 化，非常有用！防止中文乱码的神配置
      },
      myTarget: {
        files: {
          // 'js/libs.js': ['js/jquery-1.8.3.js', 'js/jquery-*.js', 'js/underscore.js', 'js/backbone.js'],
          'src/js/main.js': ['src/js/main-debug.js']
        }
      }
    },

    // 复制文件，打包到 dist 文件夹目录下
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          // src: '*.htm?',
          src: '*',
          // flatten: true,
          filter: 'isFile',
          dest: 'dist/'
        }, {
          expand: true,
          cwd: 'src/img/',
          src: '**',
          dest: 'dist/img/'
        }, {
          expand: true,
          cwd: 'src/css/',
          src: ['*.css', '!*-debug.css'],
          dest: 'dist/css/'
        }, {
          expand: true,
          cwd: 'src/js/',
          src: ['!sea-modules/**', '*.js', '!*-debug.js', '!cssrefresh*.js'],
          dest: 'dist/js/'
        }]
      }
    },

    // 监控文件
    watch: {
      scripts: {
        files: ['src/css/*.styl', 'src/css/*.css', 'src/js/*.js'],
        tasks: ['stylus', 'cssmin', 'uglify']
      }
    }
  });

  // 加载 Grunt 插件
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // 注册 Grunt 默认任务
  grunt.registerTask('default', ['cssmin', 'uglify', 'clean', 'copy']);
};