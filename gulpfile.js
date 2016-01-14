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
    });
            
});

gulp.task('serve-prod', function(){

    $.nodemon({
        script: './src/server/app.js',
        delayTime: 1,
        env : {
            'PORT': 3000,
            'NODE_ENV': 'production'
        }
    });

});

gulp.task('build', ['build-inject-lib', 'build-inject-assets'], function() {
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

gulp.task('build-inject-assets', ['build-inject-lib', 'dev-inject-assets'], function(){

    return gulp
        .src(config.prodIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe($.inject(gulp.src([
            config.src.js, 
            config.src.excludeDevConfig])
                       .pipe($.angularFilesort())))
        .pipe($.inject(gulp.src(config.src.styles)))
        .pipe(gulp.dest(config.dest.tmp))

});

gulp.task('build-inject-lib',['build-htmlTemplates', 'build-fonts', 'build-images'], function(){
    
    return gulp
        .src(config.devIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe(wiredep({
            ignorePath: '../..'
        }))
        .pipe(gulp.dest(config.dest.tmp)); 
});

gulp.task('build-htmlTemplates', ['clean-build'], function(){
    return gulp
        .src(config.src.html)
        .pipe(gulp.dest(config.dest.htmlTemplates));
});

//////////////// Dev Build tasks /////////////////


gulp.task('dev-inject-assets', ['compile-styles'],function(){

    return gulp
        .src(config.devIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe($.inject(gulp.src([
            config.src.js, 
            config.src.excludeProdconfig])
            .pipe($.angularFilesort())))
        .pipe($.inject(gulp.src(config.src.styles)))
        .pipe(gulp.dest(config.dest.client))

});

gulp.task('dev-inject-lib', function(){
   
    return gulp
        .src(config.devIndex)
        .pipe($.debug())
        .pipe($.plumber())
        .pipe(wiredep({
            ignorePath: '../..'
        }))
        .pipe(gulp.dest(config.dest.client));    
});

/////////////////////// components tasks //////////////////////

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

gulp.task('clean-build', function() {
    var files = [].concat(
        config.dest.build + '*',
        config.dest.tmp + '/*.html'
    );    
    del(files);
});

gulp.task('clean-htmltemplates', function(){
    del(config.dest.build + 'client/app/**/*.html');
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
