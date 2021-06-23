var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({
  secret: "fd34s@!@dfa453f3DF#$D&W",
  resave: true,
  saveUninitialized: true
}));
app.use(router);

var messages ='';  //錯誤訊息
router.get('/', function(req, res, next) {
  var pageNo = parseInt(req.query.pageNo);  //取得傳送的目前頁數
  if (req.session.username) {  //session值存在表示使用者已登入
    res.redirect('/adminmain');  //開啟管理頁面
  } else {  //session值不存在就到登入頁面
    res.render('login', {messages:messages, pageNo:pageNo});
  }
});

router.post('/', function(req, res) {  //按登入系統鈕
  var pageNo = parseInt(req.query.pageNo);
  var username = req.body['username'];  //取得輸入的帳號
  var password = req.body['password'];  //取得輸入的密碼
  pool.query("select * from newsadmin where username=?",[username], function(err, results) {  //根據帳號讀取資料
    if(err) throw err;
    if(results.length == 0) {  //帳號不存在
      messages = "帳號不正確！"
      res.render('login', {messages:messages, pageNo:pageNo})
    } else if(results[0].passwd != password) {  //密碼不正確
      messages = "密碼不正確！"
      res.render('login', {messages:messages, pageNo:pageNo})
    } else {  //帳號及密碼皆正確
      req.session.username = username;  //設定session
      res.redirect('/adminmain');  //開啟管理頁面
    }
  });
});

module.exports = app;