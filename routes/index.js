var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //console.log(JSON.stringify(req.query));
  if (JSON.stringify(req.query) == "{}") {
    res.render('index', {
      title: { a: ['a1', 'a2'], q: ['asd', 'asdssdsd'] }
    });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;