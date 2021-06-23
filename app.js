var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var app = express();
var cors = require("cors");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use('/index', indexRouter);
var detail =require('./routes/detail');
app.use('/detail',detail);

var login = require('./routes/login');
app.use('/login', login);

var adminmain = require('./routes/adminmain');
app.use('/adminmain', adminmain);

var logout = require('./routes/logout');
app.use('/logout', logout);

var newsadd = require('./routes/newsadd');
app.use('/newsadd', newsadd);

var newsedit = require('./routes/newsedit');
app.use('/newsedit', newsedit);

var newsdelete = require('./routes/newsdelete');
app.use('/newsdelete', newsdelete);
//var test1 = require('./routes/test1');
//app.use('/test1', test1);
//測試檔案 如果要測試test1請到local port:test1

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

module.exports = app;
