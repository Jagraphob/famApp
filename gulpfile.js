var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});

var config = require('./gulp.config');
var del = require('del');
var wiredep = require('wiredep').stream;

var port = process.env.PORT || config.port;

//////////////// ** Main tasks ** /////////////////

gulp.task('serve-dev', function(){
   
    $.nodemon({
        script: './src/server/app.js',
        delayTime: 1,
        env : {
            'PORT': 3000,
            'NODE_ENV': 'dev'
        },
        watch: './src/server/'
    })
        .on('start', function(){});
    
});

gulp.task('build', ['inject-lib', 'inject-assets', 'build-fonts', 'build-images'], function() {
    return gulp
        .src(config.index)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe($.useref({ searchPath: './' }))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.minifyCss()))
        .pipe(gulp.dest(config.dest.build));
});

//////////////// ** Sub tasks ** /////////////////

gulp.task('inject-lib', function(){
   
    return gulp
        .src(config.index)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe(wiredep({
            ignorePath: '../..'
        }))
        .pipe(gulp.dest(config.dest.client));
    
});

gulp.task('inject-assets', ['compile-styles', 'clean-assets'],function(){
    
   return gulp
        .src(config.index)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe($.inject(gulp.src(config.src.js).pipe($.angularFilesort())))
        .pipe($.inject(gulp.src(config.src.styles)))
        .pipe(gulp.dest(config.appRoot))
        
});

gulp.task('compile-styles', ['clean-styles'],function(){
    
    return gulp
        .src(config.src.sass)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(config.dest.styles));
    
});

gulp.task('build-fonts', ['clean-fonts'], function () {
    return gulp
        .src(config.src.fonts)
        .pipe($.debug())
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('build-images', ['clean-images'], function() {
    return gulp
        .src(config.src.images)
        .pipe($.imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.dest.images));
});
//////////////// ** helper tasks ** /////////////////

gulp.task('clean-assets', function() {
    var files = [].concat(
        config.dest.build + '*.html',
        config.dest.build + 'js/**/*.js'
    );    
    del(files);
});


gulp.task('clean-styles', function(){    
    del(config.dest.styles + '**/*.css');
});

gulp.task('clean-fonts', function() {
    del(config.dest.fonts + '**/*.*');
});

gulp.task('clean-images', function() {
    del(config.dest.images + '**/*.*');
});
