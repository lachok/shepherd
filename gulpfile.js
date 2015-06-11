/* jshint globalstrict: true */
/* global require */
'use strict';

var gulp = require('gulp');
var del = require('del');
var fileinclude = require('gulp-file-include');
var jade = require('gulp-jade');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var insert = require('gulp-insert');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('default', ['clean', 'dist']);

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', 'templates/*.js', '!dist/.git'], {dot: true}));

gulp.task('templates', function() {
    gulp.src('./src/templates/shepherd.ui.tree.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(insert.prepend('var jade = require(\'../../lib/jade.runtime\');\nmodule.exports = '))
    .pipe(gulp.dest('./src/templates'));
});

gulp.task('browserify', ['lintjs', 'templates'], function() {
    return browserify('./src/shepherd.js').bundle()
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('shepherd.js')) // Desired filename
        .pipe(gulp.dest('./dist/'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        // Output the file
        .pipe(gulp.dest('./dist/'));
});

gulp.task('dist', ['browserify'], function() {
  gulp.src(['./src/shepherd.tampermonkey.js'])
    .pipe(fileinclude({
      prefix: '//@@',
      basepath: './dist/'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lintjs', function() {
  return gulp.src(['gulpfile.js', './src/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});