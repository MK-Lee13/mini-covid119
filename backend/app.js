var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const models = require("./models/index.js");
var indexRouter = require('./routes/index');

var app = express();

//cors - lee
const cors = require('cors');
app.use(cors());

//body Parser - lee
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view engine', 'ejs'); // views의 ejs파일을 읽어오기 위해


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 추가
models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});

module.exports = app;
