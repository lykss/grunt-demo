// wrapper函数
module.exports = function(grunt) {

  // 项目和任务配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: { // task
      build: { // target
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        },
        options: { // 目标级的options

        }
      },
      
      options: { // 任务级的options
        /*
         * 在一个任务配置中，options属性可以用来指定覆盖内置属性的默认值。
         * 此外，每一个目标(target)中还可以拥有一个专门针对此目标(target)的options属性。
         * 目标级的options将会覆盖任务级的options。
         * options对象是可选的，如果不需要，可以忽略。
         */
      }
    },
    jshint: {
      files: ['src/**/*.js']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  })

  // 加载grunt插件和任务
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  /*
   * 自定义任务
   * 当运行一个任务时，Grunt会自动查找配置对象中的同名属性.
   * 多任务可以通过任意命名的目标(target)来定义多个配置。
   * 同时指定任务(task)和目标(target),例如grunt uglify:build,将只会处理指定目标的配置,
   * 而运行grunt uglify将遍历所有目标并依次处理。
   */
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
