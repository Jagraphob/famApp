'use strict';

var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override')
var logger          = require('morgan');
var mongoose        = require('mongoose');

var config          = require('./app.config.js');

var port            = process.env.PORT || config.port;
var environment     = process.env.NODE_ENV;
var four04          = require('./util/404')();


mongoose.connect(config.db.url, function(err) {
  if(err) {
    console.log('connection error', err);
  }
  else {
    console.log('connection with database successful');
  }
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', require('./routes'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch(environment) {
    case 'production':
        console.log('** Production **');
        app.use(express.static('./build/'));

        app.use('/app/*', function(req, res, next) {
            four04.send404(req, res);
        });

        app.use('/', function(req, res, next){
            res.render('index.html')
        });
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./app'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));

        app.use('/app/*', function(req, res, next){
            four04.send404(req, res);
        });
        app.use('/', function(req, res, next){
            res.render('../app/index.html');
        });
        break;
}

app.listen(port, function(){
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname  +
                '\nprocess.cwd = ' + process.cwd());
})
