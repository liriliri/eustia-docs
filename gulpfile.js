var gulp = require('gulp'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify');

gulp.task('js', function ()
{
    return gulp.src('dist/**/*.js')
               .pipe(uglify())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () 
{
    return gulp.src('dist/**/*.html')
               .pipe(htmlmin({
                   collapseWhitespace: true,
                   minifyJS: true
               }))
               .pipe(gulp.dest('dist')); 
});

gulp.task('default', ['js', 'html']);

