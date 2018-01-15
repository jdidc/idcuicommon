const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
    gulp.src('../src/styles/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('idcuicommon.css'))
        .pipe(gulp.dest('../dist/styles'));
});

// 编译图标样式
gulp.task('icon-css', function () {
    gulp.src('../src/styles/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('../dist/styles/font-awesome'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('../src/styles/font-awesome/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/fonts'));
});

gulp.task('default', ['css', 'fonts','icon-css']);
