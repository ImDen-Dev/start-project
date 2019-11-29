'use strict'

let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-tinypng'),
    sourcemap = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer');

let API = 'KG2gjLc8JBGWvBP9GfM9sKWcG2rv1sCN';

let isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'


let paths = {
  src: {
    pug:  ['./app/pug/*.pug', '!./app/pug/_*.pug'],
    sass: ['./app/sass/*.sass', '!./app/sass/_*.{sass,scss}', '!./app/sass/*.scss'],
    js:   './app/js/*.js',
    img:  './app/assets/images/**/*.{jpg,jpeg,png}'
  },
  build: {
    html: './build/',
    css:  './build/css/',
    js:   './build/js/',
    img:  './build/assets/images/'
  },
  watch: {
    pug:  './app/pug/**/*.pug',
    sass: ['./app/sass/**/*.{sass,scss}'],
    js:   './app/js/**/*.js',
    img:  './app/assets/images/**/*.{jpg,jpeg,png}'
  }
}

// image compression (сжатие картинок)
function image() {
  return gulp.src(paths.src.img)
  .pipe(imagemin(API))
  .pipe(gulp.dest(paths.build.img))
};


function assets() {
  return gulp.src(paths.src.img)
  .pipe(gulp.dest(paths.build.img))
};

// development (разработка)
function views() {
  return gulp.src(paths.src.pug)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.build.html))
    .pipe(browserSync.stream())
};


function styles() {
  return gulp.src(paths.src.sass)
    .pipe(gulpif(isDevelopment, sourcemap.init()))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!isDevelopment, autoprefixer({
      cascade: true
    })))
    .pipe(gulpif(!isDevelopment, csso({
      debug: true
    })))
    .pipe(gulpif(!isDevelopment, rename({
      suffix: '.min'
    })))
    .pipe(gulpif(isDevelopment,sourcemap.write('.')))
    .pipe(gulp.dest(paths.build.css))
    .pipe(browserSync.stream())
}

function js() {
  return gulp.src(paths.src.js)
    .pipe(gulpif(isDevelopment,sourcemap.init()))
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(gulpif(!isDevelopment, uglify()))
    .pipe(gulpif(!isDevelopment, rename({
      suffix: '.min'
    })))
    .pipe(gulpif(isDevelopment, sourcemap.write('.')))
    .pipe(gulp.dest(paths.build.js))
    .pipe(browserSync.stream())
}
// development (разработка)

// production
function cleanDist() {
  return gulp.src(paths.build.html, {
      read: false,
      allowEmpty: true
    })
    .pipe(clean())
}
// production


function serve() {
  browserSync.init({
    server: paths.build.html
  });
}

function watch() {
  gulp.watch(paths.watch.sass, gulp.series(styles))
  gulp.watch(paths.watch.pug, gulp.series(views))
  gulp.watch(paths.watch.img, gulp.series(assets))
  gulp.watch(paths.watch.js, gulp.series(js))
}


exports.default = gulp.series(cleanDist, views, styles, assets, js,
  gulp.parallel(serve, watch))