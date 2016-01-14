var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

var config = require('./gulp.config');
var del = require('del');
var wiredep = require('wiredep').stream;

var port = process.env.PORT || config.port;

//////////////// ** Main tasks ** /////////////////

gulp.task('serve-dev', function(){
   
    $.nodemon({
        script: './server/app.js',
        delayTime: 1,
        env : {
            'PORT': 3000,
            'NODE_ENV': 'dev'
        },
        watch: './server/'
    });
            
});

gulp.task('build', [], function(){
    
});


gulp.task('build', ['build-inject-assets'], function () {
    return gulp
        .src(config.prodIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe($.useref({ searchPath: './' }))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.minifyCss()))
        .pipe(gulp.dest(config.dest.build));
});

//////////////////////// Prod Build tasks /////////////////////////////////

gulp.task('build-inject-assets', ['build-inject-lib', 'dev-inject-assets'], function () {
    return gulp
        .src(config.prodIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe($.inject(gulp.src([
            config.src.js,
            config.src.excludeDev
        ]).pipe($.angularFilesort())))
            .pipe($.inject(gulp.src(config.src.css)))
        .pipe(gulp.dest(config.dest.tmp));
});

gulp.task('build-inject-lib', ['build-templates', 'build-fonts', 'build-images'], function () {
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.devIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe(wiredep({
        ignorePath: '..'
    }))
        .pipe(gulp.dest(config.dest.tmp));
});

gulp.task('build-templates', ['clean-templates', 'clean-build'], function(){
    return gulp
        .src([config.src.templates, '!./app/index.html'])
        .pipe(gulp.dest(config.dest.templates));
});

//////////////////////// Dev Build tasks /////////////////////////////////
gulp.task('dev-inject-assets', ['dev-inject-lib','compile-styles'], function() {
    return gulp
        .src(config.devIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe($.inject(gulp.src([
            config.src.js,
            config.src.excludeProd
    ]).pipe($.angularFilesort())))
        .pipe($.inject(gulp.src(config.src.css)))
        .pipe(gulp.dest(config.dest.devApp));
});

gulp.task('dev-inject-lib', function() {
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.devIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe(wiredep({
        ignorePath: '..'
    }))
        .pipe(gulp.dest(config.dest.devApp));
});

//////////////////////// components tasks /////////////////////////////////

gulp.task('compile-styles', ['clean-styles'], function () {
    return gulp
        .src(config.src.sass)
        .pipe($.debug())
        .pipe($.plumber())        
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(config.dest.styles));
});

gulp.task('build-images',['clean-images'], function(){
    return gulp
        .src(config.src.images)
        .pipe($.imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.dest.images));
});


gulp.task('build-fonts', ['clean-fonts'], function(){
    return gulp
        .src(config.src.fonts)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe(gulp.dest(config.dest.fonts));
});

//////////////////////// Clean tasks /////////////////

gulp.task('clean-build', function(){
    var files = [].concat(
        config.dest.templates + '**/*.html',
        config.dest.tmp + '*.html',
        config.dest.build + '*.html',
        config.dest.build + 'js/**/*.js'
    );
    del(files);
});

gulp.task('clean-templates', function(){
    del(config.dest.build + 'app/**/*.html');
});

gulp.task('clean-styles', function() {
    del(config.dest.styles + '**/*.css');
});

gulp.task('clean-images', function(){
    del(config.dest.images + '**/*.*');
});

gulp.task('clean-fonts', function(){
    del(config.dest.fonts  + '**/*.*');
});