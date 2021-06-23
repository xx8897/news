var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

var message = '';

router.get('/', function(req, res, next) {
  var pageNo = parseInt(req.query.pageNo);
  res.render('newsadd', { pageNo:pageNo, message:message});
});

router.post('/', function(req, res, next) {
  var pageNo = parseInt(req.query.pageNo);
  var ntype = req.body['news_type'];  //取得輸入的類型
  var nsubject = req.body['news_subject'];
  var neditor = req.body['news_editor'];
  var ncontent = req.body['news_content'];
  var nok = req.body['news_ok'];
  
  pool.query('insert into newscenter set ?', [{  //新增資料
      news_type:ntype,
      news_date:new Date(),
      news_subject:nsubject,
      news_editor:neditor,
      news_content:ncontent,
      news_ok:nok,
      news_hits:0
    }] , function(err, results) {
      if(err) throw err;
      res.redirect('/adminmain');
  });
});

module.exports = router;