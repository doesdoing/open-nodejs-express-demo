var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_con = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  port: 3306,
  dateStrings: true
};
var pool = mysql.createPool(db_con);

function Find_keyword(list, keyWord) {
  var reg = new RegExp(keyWord, "i");
  var List = JSON.stringify(list);
  var R = JSON.parse(List);
  var arr = [];
  for (var i = 0; i < R.length; i++) {
      var tmp = JSON.stringify(R[i]);
      if (reg.test(tmp)) {
          arr.push(JSON.parse(tmp));
      }
  }
  return arr;
}

function SQL(sql, value) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      connection.query(sql, value, function (error, results, fields) {
        resolve(results);
        connection.release();
        if (error) throw error;
      });
    });
  });
}
router.get('/:R', function (req, res) {
  function Check_Cookies(callback) {
    SQL_CMD = "SELECT * FROM sys_user_list";
    var Cookies = req.signedCookies.LOGIN;
    console.log(Cookies);

    SQL(SQL_CMD).then(function (data) {
      var tmp = Find_keyword(data, Cookies);
      if (tmp.length <= 0) {
        res.clearCookie("LOGIN");
        res.status(200).redirect('login');
      } else {
        callback();
      }
    });
  }
  if (JSON.stringify(req.query) == "{}") {
    var Router = req.params.R;
    Check_Cookies(function () {
      if (Router == 'system' || Router == 'server' || Router == 'network' || Router == 'sql' || Router == 'user' || Router == 'index') {
        res.render(Router);
      } else {
        res.status(200).redirect('/');
      }
    });
  } else {
    res.sendStatus(404);
  }
});
module.exports = router;