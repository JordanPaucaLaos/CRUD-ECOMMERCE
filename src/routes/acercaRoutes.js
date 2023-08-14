var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/acerca', function(req, res, next) {
  res.render('acerca');
});

module.exports = router;