var gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  uglify = require('gulp-uglify')

gulp.task('js', function() {
  return gulp
    .src(['dist/**/*.js', '!dist/demo/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
})

gulp.task('html', function() {
  return gulp
    .src('dist/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyJS: true
      })
    )
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['js', 'html'])
