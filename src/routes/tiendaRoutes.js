const express = require('express');
const router = express.Router();
const productosController = require("../controllers/productosController");
const uploadFile         = require('../middleware/upload');


router.get('/tienda',productosController.list);
router.get('/tienda/detail/:id', productosController.detail);
router.get('/tienda/add', productosController.add);
router.post('/tienda/create', uploadFile.single('file'), productosController.create);
router.get('/tienda/edit/:id', productosController.edit);
router.put('/tienda/update/:id', productosController.update);
router.delete('/tienda/delete/:id', productosController.destroy);
/* GET home page. */
//router.get('/tienda', function(req, res, next) {
 // res.render('tienda');
//});





module.exports = router;