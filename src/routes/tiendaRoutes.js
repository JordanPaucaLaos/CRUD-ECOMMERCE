var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/tienda', function(req, res, next) {
  res.render('tienda');
});

module.exports = router;