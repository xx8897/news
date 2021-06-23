var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');

var linePerPage=5;

router.get('/', function(req, res, next) {
  var pageNo = parseInt(req.query.pageNo);
  if(isNaN(pageNo) || pageNo < 1){
    pageNo=1;
  }

  pool.query('select count(*) as cnt from newscenter', function(err, results) {
    if(err) throw err;
    var totalLine=results[0].cnt;
    var totalPage=Math.ceil(totalLine/linePerPage);

    pool.query('select * from newscenter order by news_date desc limit ?, ?',[(pageNo-1)*linePerPage, linePerPage], function(err, results) {
      if(err) throw err;
      res.render('adminmain', { data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, linePerPage:linePerPage});
    });
  });
});

module.exports = router;