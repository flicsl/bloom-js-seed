var gulp = require('gulp');

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['style', 'script', 'index']);
gulp.task('serve', ['start-server', 'watch']);
gulp.task('watch', WatchTask);
gulp.task('style', StyleTask);
gulp.task('script', ScriptTask);
gulp.task('index', IndexTask);
gulp.task('reload-browser', ReloadBrowserTask);

function WatchTask () {

}

function StyleTask () {

}

function ScriptTask () {

}

function IndexTask () {

}

function ReloadBrowserTask () {

}