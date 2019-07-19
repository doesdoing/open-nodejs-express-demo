var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    var user_cookies = req.signedCookies.LOGIN;
    if (user_cookies) {
        res.status(200).redirect('index');
    } else {
        res.status(200).render('login');
    }
});
module.exports = router;