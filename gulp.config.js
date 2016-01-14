module.exports = {
    
    src: {
        html: './src/**/*.html',
        js: './src/client/app/**/*.js',
        excludeDevConfig:  '!./src/client/app/config/configDev.js',
        excludeProdconfig: '!./src/client/app/config/configProd.js',
        sass: './src/client/app/styles/*.scss',
        styles: './src/client/app/.tmp/*.css',
        fonts: [
            './bower_components/font-awesome/fonts/*.*'
        ],
        images: './src/client/images/**.*'
        
    },
    
    dest: {
        build:  './build/',
        tmp:    './src/client/app/.tmp/',
        client: './src/client/',
        styles: './src/client/app/.tmp/',
        fonts:  './build/fonts/',
        images: './build/images',
        htmlTemplates: './build/src'
    },
    
    devIndex:   './src/client/index.html',
    prodIndex:  './src/client/app/.tmp/index.html',
    port: 3000
}