var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');
var upload = multer({
    dest: './public/images/'
}).single('file');
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

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        if (req.file) {
            var f = req.file.filename;
            console.log(req.file);
            var SQL_CMD = "SELECT * FROM sys_user_list";
            SQL(SQL_CMD).then(function (data) {
                var check_cookies = req.signedCookies.LOGIN;
                var tmp = Find_keyword(data, check_cookies);
                if (tmp.length > 0) {
                    SQL_CMD = 'UPDATE sys_user_list SET Login_ico=? WHERE Login_user=?;';
                    SQL(SQL_CMD, [f, tmp[0].Login_user]).then(function (data) {
                        res.status(200).send('done');
                    });
                } else {
                    res.sendStatus(404);
                }
            }); 
        }
    });
});
router.get('/', function (req, res) {
    var SQL_CMD;
    var DB;
    var data = req.query.data;
    var base64_2_str = Buffer.from(data, 'base64').toString('utf8');
    var Json_Data = decodeURI(base64_2_str);
    Json_Data = JSON.parse(Json_Data);
    var Start = Json_Data.start.toString();
    var End = Json_Data.end.toString();
    var tmp_data_1 = [];
    var tmp_data_2 = [];
    var tmp_data_3 = [];
    var json = {};

    console.log(Json_Data);

    function Find(data) {
        var a = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].Login_user == Json_Data.data.user) {
                a.push(data[i]);
            }
        }
        return a;
    }
    function Find_Data() {
        SQL_CMD = "SELECT * FROM " + DB;
        SQL(SQL_CMD).then(function (data) {
            var tmp;
            if (Start && End) {
                tmp = Find_keyword(data, Json_Data.keyword).slice(Start, End);
                json.len = Find_keyword(data, Json_Data.keyword).length;
                json.data = tmp;
            }
            res.status(200).jsonp(json);
        });
    }
    if (Json_Data.DB == 'server') {
        DB = 'sys_server_list';
    } else if (Json_Data.DB == 'network') {
        DB = 'sys_network_list';
    } else if (Json_Data.DB == 'sql') {
        DB = 'sys_sql_list';
    } else if (Json_Data.DB == 'web') {
        DB = 'sys_web_list';
    } else if (Json_Data.DB == 'user') {
        DB = 'sys_user_list';
    } else {
        res.sendStatus(404);
    }
    if (Json_Data.Do == 'find') {
        Find_Data();
    } else if (Json_Data.Do == 'delete') {
        var arr = [];
        for (var i = 0; i < Json_Data.ID.length; i++) {
            arr.push('?');
        }
        SQL_CMD = 'DELETE FROM ' + DB + ' WHERE ID in (' + arr.toString() + ')';
        SQL(SQL_CMD, Json_Data.ID).then(function (data) {
            if (data.affectedRows > 0) {
                Find_Data();
            } else {
                res.status(200).send("error");
            }
        });
    } else if (Json_Data.Do == 'add') {
        for (var key in Json_Data.Data) {
            tmp_data_1.push(key);
            tmp_data_2.push(Json_Data.Data[key]);
        }
        for (var k = 0; k < tmp_data_2.length; k++) {
            tmp_data_3.push('?');
        }
        var a = false;
        SQL_CMD = 'INSERT INTO ' + DB + '(' + tmp_data_1.toString() + ') VALUES (' + tmp_data_3.toString() + ')';
        for (var i = 0; i < tmp_data_2.length; i++) {
            if (tmp_data_2[i]) {
                a = true;
            }
        }
        if (a) {
            SQL(SQL_CMD, tmp_data_2).then(function (data) {
                if (data.affectedRows > 0) {
                    Find_Data();
                } else {
                    res.status(200).send("error");
                }
            });
        } else {
            Find_Data();
        }
    } else if (Json_Data.Do == 'change') {
        for (var K in Json_Data.Data) {
            tmp_data_1.push(K + '=?');
            tmp_data_2.push(Json_Data.Data[K]);
        }
        for (var j = 0; j < tmp_data_2.length; j++) {
            tmp_data_3.push('?');
        }
        SQL_CMD = 'UPDATE ' + DB + ' SET ' + tmp_data_1.toString() + ' WHERE ID = ' + Json_Data.Data.ID;
        SQL(SQL_CMD, tmp_data_2).then(function (data) {
            if (data.affectedRows > 0) {
                Find_Data();
            } else {
                res.status(200).send("error");
            }
        });
    } else if (Json_Data.Do == 'login') {
        SQL_CMD = 'UPDATE ' + DB + ' SET Login_cookies = ? WHERE Login_user = ?';
        SQL(SQL_CMD, [Math.random(), Json_Data.data.user]).then(function (D) {
            if (D.affectedRows > 0) {
                SQL_CMD = "SELECT * FROM " + DB;
                SQL(SQL_CMD).then(function (data) {
                    var tmp = Find(data);
                    console.log(tmp);
                    if (tmp.length > 0) {
                        var check_user = tmp[0].Login_user;
                        var check_password = tmp[0].Login_password;
                        if (check_user == Json_Data.data.user && check_password == Json_Data.data.password) {
                            res.cookie('LOGIN', tmp[0].Login_cookies, {
                                maxAge: 60 * 1000 * 60 * 12,
                                signed: true
                            });
                            res.status(200).send('succeed');
                        } else {
                            res.status(200).send('fail');
                        }
                    } else {
                        res.status(200).send('fail');
                    }
                });
            } else {
                console.log('fail');
            }
        });
    } else if (Json_Data.Do == 'personal') {
        SQL_CMD = "SELECT * FROM " + DB;
        SQL(SQL_CMD).then(function (data) {
            var check_cookies = req.signedCookies.LOGIN;
            var tmp = Find_keyword(data, check_cookies);
            if (tmp.length > 0) {
                delete tmp[0].Login_cookies;
                delete tmp[0].Login_team;
                res.status(200).jsonp(tmp[0]);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(404);
    }

});

module.exports = router;