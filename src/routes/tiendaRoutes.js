const express = require('express');
const router = express.Router();
const productosController = require("../controllers/productosController");

router.get('/tienda',productosController.list);
router.get('/tienda/add', productosController.add);
router.post('/tienda/create', productosController.create);

/* GET home page. */
//router.get('/tienda', function(req, res, next) {
 // res.render('tienda');
//});





module.exports = router;