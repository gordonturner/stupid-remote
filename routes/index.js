var express = require('express');
var router = express.Router();

/* handle GET root request */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

module.exports = router;
