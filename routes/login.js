var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {
    // if (JSON.stringify(req.query) == "{}") {      
    if (JSON.stringify(req.query) == "{}") {
        res.render('login', {
            title: { a: ['a1', 'a2'], q: ['asd', 'asdssdsd'] }
        });
    } else {
        res.sendStatus(404);
    }
});

/* POST login page. */

router.post('/', function (req, res, next) {
    // if (JSON.stringify(req.query) == "{}") {      
    if (req.body) {
        res.render('index', {
            title: { a: ['a1', 'a2'], q: ['asd', 'asdssdsd'] }
        });
    } else {
        res.sendStatus(404);
    }
});
module.exports = router;