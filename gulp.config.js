module.exports = {
    
    src: {
        html: './src/client/app/**/*.html',
        js: './src/client/app/**/*.js',
        sass: './src/client/app/styles/*.scss',
        styles: './src/client/app/styles/*.css',
        fonts: [
            './bower_components/font-awesome/fonts/*.*'
        ],
        images: './src/client/images/**.*'
        
    },
    
    dest: {
        build: './build/',
        client: './src/client/',
        styles: './src/client/app/.tmp/',
        fonts: './build/fonts/',
        images: './build/images'
    },
    
    appRoot: './src/client/',
    index: './src/client/index.html',
    port: 3000
}