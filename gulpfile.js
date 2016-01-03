var gulp        = require('gulp');
var changed     = require('gulp-changed');
var watch       = require('gulp-watch');
var runSequence = require('run-sequence');
var ts          = require('gulp-typescript');
var less        = require('gulp-less');

gulp.task('default', function(callback) {
  runSequence(
    [
      'build',
      'watch'
    ],
    callback);
});

// BUILD SECTION
gulp.task('build', function(callback) {
  return runSequence(
    [
      'lessCompile',
      'browserStatic',
      'browserTypeScript',
      'serverTypeScript'
    ],
    callback);
});

gulp.task("lessCompile",function () {
    return gulp.src('src/browser/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('built/browser'));
});

gulp.task('browserStatic', function () {
  return gulp.src(['src/browser/**/{*.js,*.html}'], {
      base: 'src/browser'
    })
    .pipe(gulp.dest('built/browser'));
});

gulp.task('browserTypeScript', function () {
  return gulp.src('src/browser/**/*.ts')
    .pipe(ts({
      module: 'system',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      target: 'es5'
    })).js
    .pipe(gulp.dest('built/browser'));
});

gulp.task('serverTypeScript', function () {
  return gulp.src('src/server/**/*.ts', {
      base: 'src/server'
    })
    .pipe(ts({
      module: 'commonjs',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      target: 'es5'
    })).js
    .pipe(gulp.dest('built/server'));
});

// WATCH SECTION

gulp.task('watch', function(callback) {
  return runSequence(
    [
      'browserStatic:watch', // currently only for config.js
      'browserTypeScript:watch',
      'serverTypeScript:watch'
    ],
    callback);
});

gulp.task('browserStatic:watch', function () {
  return gulp.watch('src/browser/**/{*.js,*.html}', ['browserStatic']);
});

gulp.task('browserTypeScript:watch', function () {
  return gulp.watch('src/browser/**/*.ts', ['browserTypeScript']);
});

gulp.task('serverTypeScript:watch', function () {
  return gulp.watch('src/server/**/*.ts', ['serverTypeScript']);
});