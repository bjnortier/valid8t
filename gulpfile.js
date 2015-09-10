var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');

var srcFiles = path.join('lib', '**', '*.js');
var unitTestFiles = path.join('test', '**', '*.test.js');

// ----- Individual Tasks -----

gulp.task('clearconsole', function() {
  process.stdout.write('\x1Bc');
});

gulp.task('jshint', function() {
  return gulp.src([srcFiles, unitTestFiles])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src([srcFiles, unitTestFiles])
    .pipe(jscs());
});
 
gulp.task('babel', function () {
  return gulp.src(srcFiles)
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('unit', ['babel'], function() {
  return gulp.src(unitTestFiles)
    .pipe(mocha({}));
});

// ----- Aggregate Tasks -----

gulp.task('test', ['jshint', 'jscs', 'babel', 'unit']);

gulp.task('default', ['test']);

gulp.task('watch', function() {
  gulp.watch(srcFiles, ['clearconsole', 'jshint', 'jscs', 'babel', 'unit']);
  gulp.watch(unitTestFiles, ['clearconsole', 'jshint', 'jscs', 'unit']);
});