var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    if (JSON.stringify(req.query) == "{}") {
        res.clearCookie("LOGIN");
        res.status(200).redirect('login');
    }
});
module.exports = router;