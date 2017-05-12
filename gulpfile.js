'use strict';

var gulp         = require('gulp'),
    del          = require('del'),
    sourcemaps   = require('gulp-sourcemaps'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    browsersync  = require('browser-sync');

// настройка путей
var path = {
  build: {
    js: 'build/js/'
  },
  src:   {
    sass:    'src/styles/main.scss',
    css:     'src/styles/',
    libs:    ['src/libs/jquery-3.2.1.min.js',
              //'src/libs/jquery.magnific-popup.js'
            ]
  },
  watch: {},
  clean: ['build', 'src/styles/main.css']
};

// Очистка папок и файлов, указанных в path.clean
gulp.task('clean', function() {
  return del(path.clean);
});


// Сборка всех стилей в main.css
gulp.task("sass", function () {
  return gulp.src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.src.css));
});


gulp.task('browser-sync', function() {
  browsersync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
});