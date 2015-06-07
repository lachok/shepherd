'use strict';

var gulp = require('gulp');
var del = require('del');
var fileinclude = require('gulp-file-include');

gulp.task('default', ['clean', 'build']);

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

gulp.task('build', function() {
  gulp.src(['./src/*.js', '!./src/shepherd.core.js'])
    .pipe(fileinclude({
      prefix: '//@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'));
});