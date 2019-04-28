var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //console.log(JSON.stringify(req.query));
  if (JSON.stringify(req.query) == "{}") {
    res.render('index', {
      title: 'Express'
    });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;