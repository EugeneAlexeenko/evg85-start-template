'use strict';

//подключение плагинов
var gulp         = require('gulp'),
    del          = require('del'), //удаление файлов и папок
    sourcemaps   = require('gulp-sourcemaps'), //изготовление sourcemaps
    sass         = require('gulp-sass'), //компиляция sass
    notify       = require('gulp-notify'), //вывод ошибок sass
    cssnano      = require('gulp-cssnano'), //минификация css
    concat       = require('gulp-concat'), //клеим файлы
    preprocess   = require('gulp-preprocess'), //препроцессинг
    browserSync  = require('browser-sync'); //локальный веб-сервер

//настройка путей
var path = {
  // финальная сборка проекта
  build: {
    root: 'build/',
    css:  'build/css/',
    js:   'build/js/'
  },
  // исходники
  src:   {
    root: 'src/',
    html: 'src/html/**/*.html',
    sass: 'src/styles/main.scss',
    css:  'src/styles/',
    js:   'src/js/',
    // нужные в проекте libs должны быть добавлены/раскомментированы
    libs: ['src/libs/jquery-3.2.1.min.js',
           //'src/libs/Magnific-Popup/jquery.magnific-popup.min.js',
          ]
  },
  watch: {
    html: 'src/html/**/*.html',
    sass: 'src/styles/**/*.scss',
    js:   'src/js/**/*.js'
  },
  clean: ['build',
          'src/index.html',
          'src/styles/main.css',
          'src/js/libs.js'
         ]
};

// Конфигурация локального вебсервера
var webserver = {
    //для режима development
    dev: {
        server: {
            baseDir: './src'
        },
        //tunnel: true,
        host: 'localhost',
        port: 9001,
        logPrefix: 'app_dev'
    },
    //для режима production
    prod: {
        server: {
            baseDir: './build'
        },
        //tunnel: true,
        host: 'localhost',
        port: 9002,
        logPrefix: 'app_prod'
    }
};

// Очистка папок и файлов, указанных в path.clean
gulp.task('clean', function() {
  return del(path.clean);
});

// Сборка стилей: режим development
gulp.task('sass:dev', function () {
  return gulp.src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError({
        message: "<%= error.message %>",
        title  : "Sass Error!"
      })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.src.css))
    .pipe(browserSync.stream())
    .pipe(notify("Sass - no errors!"))
});

// Сборка стилей: режим production
gulp.task('sass:prod', function () {
  return gulp.src(path.src.sass)
    .pipe(sass().on("error", notify.onError({
        message: "<%= error.message %>",
        title  : "Sass Error!"
      })))
    .pipe(cssnano())
    .pipe(gulp.dest(path.build.css));
});

// Сборка libs в libs.js
gulp.task('libs', function(){
  return gulp.src(path.src.libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(path.src.js))
});


//Препроцессинг HTML: для режима development
gulp.task('html:dev', function(){
  return gulp.src(path.src.html)
    .pipe(preprocess({context: { NODE_ENV: 'development' }}))
    .pipe(gulp.dest(path.src.root))
});

//Препроцессинг HTML: для режима production
gulp.task('html:prod', function(){
  return gulp.src(path.src.html)
    .pipe(preprocess({context: { NODE_ENV: 'production' }}))
    .pipe(gulp.dest(path.build.root))
});


//Список задач режима development
gulp.task('dev', [
  'clean',
  'libs',
  'html:dev',
  'sass:dev',
  'watch',
  'webserver:dev'
]);

//Список задач режима production
gulp.task('prod', [
  'clean',
  'html:prod',
  'sass:prod'
]);

//Отслеживание изменений
gulp.task('watch', function(){
  gulp.watch(path.watch.html, ['html:dev', browserSync.reload]);
  gulp.watch(path.watch.sass, ['sass:dev']);
  gulp.watch(path.watch.js).on('change', browserSync.reload);
});

// Запуск локального веб-сервера
// development
gulp.task('webserver:dev', function () {
    browserSync(webserver.dev);
});

// production
gulp.task('webserver:prod', function () {
    browserSync(webserver.prod);
});

//Default task
gulp.task('default', ['dev']);