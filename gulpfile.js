'use strict';

var gulp         = require('gulp'),
    del          = require('del'),
    sourcemaps   = require('gulp-sourcemaps'),
    sass         = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    browsersync  = require('browser-sync');

// настройка путей
var path = {
  build: {},
  src:   {
    sass: 'src/styles/main.scss',
    css:  'src/styles'
  },
  watch: {},
  clean: ['build', 'src/styles/main.css']
};

// Очистка папок и файлов
gulp.task('clean', function() {
  return del(path.clean);
});


gulp.task('browser-sync', function() {
  browsersync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
});

// Сборка стилей
gulp.task("sass", function () {
  return gulp.src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    //.pipe(autoprefixer(['last 2 versions']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.src.css));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});