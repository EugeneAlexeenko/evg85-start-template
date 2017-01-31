'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    browsersync  = require('browser-sync');

gulp.task('browser-sync', function() {
  browsersync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
});

gulp.task("sass", function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass())
    //.pipe(autoprefixer(['last 2 versions']))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('sass:watch', function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});