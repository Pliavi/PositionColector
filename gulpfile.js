/* eslint-disable */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var styl = require('gulp-stylus');
var pug = require('gulp-pug');
var browserify = require('gulp-browserify');
var pump = require('pump');

gulp.task('styl', function (cb) {
  pump([
        gulp.src('assets/styl/**/*.styl'),
        styl(),
        gulp.dest('dist/assets/css')
    ],
    cb
  );
}); 

gulp.task('pug', function (cb) {
  pump([
        gulp.src('pug/**/*.pug'),
        pug(),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('assets/js/**/*.js'),
        babel({ presets:['es2015'] }),
        browserify({ insertGlobals : true }),
        uglify(),
        gulp.dest('dist/assets/js')
    ],
    cb
  );
});

gulp.task('img', function (cb) {
  pump([ gulp.src('assets/img/**/*'), gulp.dest('dist/assets/img') ], cb );
});

gulp.task('php', function (cb) {
  pump([ gulp.src('php/**/*'), gulp.dest('dist/php') ], cb );
});

gulp.task('all', ['compress', 'styl', 'pug', 'img', 'php'])
gulp.task('watch', () => gulp.watch(['pug/*.pug','assets/**/*', 'php/*.php'], ['all']))
gulp.task('default', ['watch'])