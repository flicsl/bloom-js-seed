var gulp = require('gulp');
var outline = require('./outline.json');

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['style', 'script', 'index']);
gulp.task('serve', ['start-server', 'watch']);
gulp.task('watch', WatchTask);
gulp.task('style', StyleTask);
gulp.task('script', ScriptTask);
gulp.task('index', IndexTask);
gulp.task('reload-browser', ReloadBrowserTask);

var concat = require('gulp-concat');
var gutil = require('gulp-util');

function StyleTask () {
	return gulp.src(outline.src + '/css/**/*.css')
			.pipe(concat(withMinCSS(outline.name))).on('error', gutil.log)
			.pipe(gulp.dest(outline.dist + '/css/')).on('error', gutil.log);
}

function ScriptTask () {
	return gulp.src(outline.src + '/js/**/*.js')
			.pipe(concat(withMinJS(outline.name))).on('error', gutil.log)
			.pipe(gulp.dest(outline.dist + '/js/')).on('error', gutil.log);
}

function IndexTask () {
	
}

function ReloadBrowserTask () {

}

function WatchTask () {

}

function withMinJS (file) {
	return file + ".min.js";
}

function withMinCSS (file) {
	return file + ".min.css";
}