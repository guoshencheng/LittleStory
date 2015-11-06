var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var routes = require('./routes')
var token = require('./routes/token')
var qiniu = require('qiniu')
var config = require('./config')
var app = express();

qiniu.conf.ACCESS_KEY = 'EyEwm6Bjadr4ojSFxpKWt6k-PoyT99D5l_qMCEaL';
qiniu.conf.SECRET_KEY = 'xOUHlBygVg_dIxPcgWmEVu7GG5jl_XVQ57mrV7o0';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(token.checkToken)

app.use(function(req, res, next) {
    if (res.errorCode) {
        res.json({errorCode: res.errorCode, errorMsg:config.error[res.errorCode]})
    } else {
        next()
    }
})

app.use('/', routes);

app.use(function(req, res, next) {
    if (res.errorCode) {
        if(res.data) {
            res.json({data:res.data, errorCode: res.errorCode, errorMsg:config.error[res.errorCode]})
        } else {
            res.json({errorCode: res.errorCode, errorMsg:config.error[res.errorCode]})
        }
    } else {
        next()
    }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
