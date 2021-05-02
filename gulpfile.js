const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
]


function styles(){
    return gulp.src(cssFiles)
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./*.html').on('change', browserSync.reload);
}




gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('build', gulp.series(gulp.parallel(styles)))
gulp.task('start', gulp.series('build','watch'));