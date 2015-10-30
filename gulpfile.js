var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var args = require('yargs')
  .alias('p', 'prod')
  .default('prod', false)
  .argv;

var proj = {
  public: './public/',
  source: './client/',
  lib: 'lib/',
  static: 'static/',
  scss: './scss/'
};

var files = {
  jsBundle: 'bloom-js-seed.min.js',
  cssBundle: 'bloom-js-seed.min.css'
};

var paths = {
  html: [ proj.source + 'index.html' ],
  images: [ proj.source + 'img/**/*' ],
  styles: [ proj.source + 'css/**/*.{css,less}' ],
  scripts: [ proj.source + 'js/**/*.js', '!' + proj.source + 'js/' + files.jsbundle], // exclude the file we write too
  statics: [ proj.source + proj.static + '**/*' ],
  libs: [ proj.source + proj.lib + '**/*'],
  less: [ proj.source + 'css/**/*.less' ],
  dist: proj.public
};

// scripts - clean dist dir then annotate, minify, concat
gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(gulpif(args.prod, uglify())).on('error', gutil.log)
    .pipe(concat(files.jsBundle)).on('error', gutil.log)
    .pipe(gulp.dest(paths.dist + 'scripts'))
    .on('error', function (error) {
      console.error('' + error);
    });
});