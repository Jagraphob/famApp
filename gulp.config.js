module.exports = {
    
    src: {
        sass:       './app/styles/*.scss',
        images:     './app/images/**.*',
        fonts: [
                    './bower_components/fontawesome/fonts/*.*',
                    './bower_components/bootstrap/dist/fonts/*.*'
        ],
        templates:  './app/**/*.html',
        js:         './app/**/*.js',
        excludeProd:'!./app/config/configProd.js',
        excludeDev: '!./app/config/configDev.js',
        css:        './.tmp/*.css'
    },
    
    dest: {
        build:      './build/',
        tmp:        './.tmp/',
        images:     './build/images/',
        fonts:      './build/fonts/',
        templates:  './build/app',
        styles:     './.tmp/',
        devApp:     './app',        
    },
    
    devIndex:   './app/index.html',
    prodIndex:  './.tmp/index.html',
    port: 3000
}