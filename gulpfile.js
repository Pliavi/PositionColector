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
        gulp.dest('__dist/assets/css')
    ],
    cb
  );
});

gulp.task('css-copy', function(cb){
  pump([
    gulp.src('assets/css/**/*'),
    gulp.dest('__dist/assets/css')    
  ], cb)
})

gulp.task('pug', function (cb) {
  pump([
        gulp.src('pug/**/*.pug'),
        pug(),
        gulp.dest('__dist')
    ],
    cb
  );
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('assets/js/**/*.js'),
        babel({ presets:['es2015'] }),
        browserify({ insertGlobals : true }),
        // uglify(),
        gulp.dest('__dist/assets/js')
    ],
    cb
  );
});

gulp.task('img', function (cb) {
  pump([ gulp.src('assets/img/**/*'), gulp.dest('__dist/assets/img') ], cb );
});

gulp.task('images', function (cb) {
  pump([ gulp.src('images/**/*'), gulp.dest('__dist/images') ], cb );
});

gulp.task('php', function (cb) {
  pump([ gulp.src('php/**/*'), gulp.dest('__dist/php') ], cb );
});

gulp.task('all', ['compress', 'styl', 'pug', 'img', 'images', 'php', 'css-copy'])
gulp.task('watch', () => gulp.watch(['pug/*.pug', 'images/**/*','assets/**/*', 'php/*.php'], ['all']))
gulp.task('default', ['watch'])