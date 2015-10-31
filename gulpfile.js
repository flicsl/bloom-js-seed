var gulp = require('gulp');
var outline = require('./outline.json');

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['style', 'script', 'index']);
gulp.task('watch', WatchTask);
gulp.task('style', StyleTask);
gulp.task('script', ScriptTask);
gulp.task('index', IndexTask);
gulp.task('start-server', StartServerTask);
gulp.task('reload-browser', ReloadBrowserTask);

var concat = require('gulp-concat');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');

var args = require('yargs')
  .alias('p', 'prod')
  .default('prod', false)
  .argv;

var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');

function StyleTask () {
	return gulp.src(outline.src + '/css/**/*.css')
			.pipe(concat(withMinCSS(outline.name))).on('error', gutil.log)
			.pipe(minifyCss()).on('error', gutil.log)
			.pipe(gulp.dest(outline.dist + '/css/')).on('error', gutil.log)
			.pipe(browserSync.stream());
}

var uglify = require('gulp-uglify');

function ScriptTask () {
	return gulp.src(outline.src + '/js/**/*.js')
			.pipe(concat(withMinJS(outline.name))).on('error', gutil.log)
			.pipe(gulpif(args.prod, uglify())).on('error', gutil.log)
			.pipe(gulp.dest(outline.dist + '/js/')).on('error', gutil.log);
}

var inject = require('gulp-inject');
var htmlreplace = require('gulp-html-replace');
var bowerFiles = require('main-bower-files');

var jsBundle = outline.dist + '/js/' + withMinJS(outline.name);
var cssBundle = outline.dist + '/css/' + withMinCSS(outline.name);

function IndexTask () {
	var defaultInjectionOptions = {
		addRootSlash: false,
		ignorePath: '/' + outline.dist,
		name: 'inject'
	};

	var bowerInjectionOptions = {
		addRootSlash: false,
		ignorePath: '/' + outline.dist,
		name: 'bower'
	};

	return gulp.src(outline.src + '/html/index.html')
  			.pipe(htmlreplace({'appTitle': outline.name}))
  			.pipe(inject(gulp.src(bowerFiles(), {read: false}), bowerInjectionOptions))
  			.pipe(inject(gulp.src(jsBundle, {read: false}), defaultInjectionOptions))
  			.pipe(inject(gulp.src(cssBundle, {read: false}), defaultInjectionOptions))
  			.pipe(gulp.dest(outline.dist));
}

function ReloadBrowserTask () {
	browserSync.reload();
}

var historyApiFallback = require('connect-history-api-fallback');
function StartServerTask () {
	browserSync.init({
      server: {
          baseDir: outline.dist,
          middleware: [ historyApiFallback() ]
      }
  });
}

function WatchTask () {
	StartServerTask();

	gulp.watch(outline.src + '/js/**/*.js', ['script', 'reload-browser']);
  	gulp.watch(outline.src + '/css/**/*.css', ['style']);
  	gulp.watch(outline.src + '/html/**/*.html', ['index', 'reload-browser']);
  	gulp.watch(outline.src + '/lib/**/*.{js,css}', ['index', 'reload-browser']);
}

function withMinJS (file) {
	return file + '.min.js';
}

function withMinCSS (file) {
	return file + '.min.css';
}