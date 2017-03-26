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
        gulp.src('styl/**/*.styl'),
        styl(),
        gulp.dest('dist/css')
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
        gulp.src('js/**/*.js'),
        babel({ presets:['es2015'] }),
        browserify({ insertGlobals : true }),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('copy', function (cb) {
  pump([
      gulp.src('img/**/*'),
      gulp.dest('dist/img')
  ]);
  pump([
      gulp.src('php/**/*'),
      gulp.dest('dist/php')
  ]);
  cb
});

gulp.task('all', ['compress', 'styl', 'pug', 'copy'])
gulp.task('watch', () => gulp.watch(['pug/*.pug','js/*.js','styl/*.styl', 'php/*.php'], ['all']))
gulp.task('default', ['watch'])