var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin');
    gcmq = require('gulp-group-css-media-queries'),
    // autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');


gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});


gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.sass', ['sass']);
});


gulp.task('js:build', function () {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('style:build', function () {
    gulp.src('src/css/frontend.css')
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css/'))
});


gulp.task('imagemin', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('build', [
    'js:build',
    'style:build'
]);


gulp.task('fonts:build', function() {
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('html:build', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'))
});


gulp.task('pre-build', [
    'imagemin',
    'fonts:build',
    'html:build'
]);
