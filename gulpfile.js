var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');


gulp.task('sass', function () {
    gulp.src(['css/src/**/*.scss']).pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        })).pipe(sass()).pipe(gulp.dest('./css/'))
        //        .pipe(reload())
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('js', function () {
    gulp.src(['js/src/**/*.js']).pipe(plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    })).pipe(gulp.dest('js/')).pipe(reload())
});


gulp.task('html', function () {
    browserSync.reload();
});


gulp.task('nunjucks', function () {
    return gulp.src('pages/**/*.+(html|nunjucks)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('./'));
});


gulp.task('default', function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch('js/src/**/*.js', ['js']);
    gulp.watch('css/src/**/*.scss', ['sass']);
    gulp.watch('*.html', ['html']);
    gulp.watch('images/**/*', ['image']);
});