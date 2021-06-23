var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');
 
/* GET home page. */
router.get('/', function(req, res, next) {
    pool.query('select * from newscenter where news_type=?', ["公告"], function(err, results) {
        if(err) throw err;
        res.render('test1', { data:results});
    });
});

module.exports = router;