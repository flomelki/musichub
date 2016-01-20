// server requirements
var express = require('express');
var http = require('http');
var util = require('util');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// own libs
require('./modules/prototypes')
require('./modules/mongo')

// routes definition
var musicsroutes = require('./routes/musics');

// GO
var app = express();

// view engine setup
app.set('port', process.env.PORT || 666);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());  
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'forms')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'musicFiles')));

app.use('/', musicsroutes);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

http.createServer(app).listen(app.get('port'), function()
  {
    console.log('Listening port ' + app.get('port'));
  });
  

