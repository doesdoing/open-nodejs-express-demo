var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET jq page. */
router.get('/', function (req, res, next) {
  var Path='public/javascripts/jquery.min.js';
  var rs = fs.createReadStream(Path);
  rs.pipe(res);
});
module.exports = router;
