const db = require("../database/models");
const path = require("path");

//modelos
const Productos = db.Producto;
const Marcas = db.Marca;

const productosController = {
    list: (req, res) =>{
        db.Producto.findAll({
            include: ["marca"]
        })

            .then(productos =>{
                res.render("tienda", {productos})
            })
    },

    add: function(req, res) {
        let promMarcas = Marcas.findAll();

        Promise
        .all([promMarcas])
        .then(([allMarcas]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'productosAdd'), {allMarcas})})
        .catch(error => res.send(error))
    },

    create: function (req,res){
        Productos.create({
            nombre_prod: req.body.nombre_prod,
            precio_prod: req.body.precio_prod,
            id_marca: req.body.id_marca
        })
        .then(()=> {
            return res.redirect('/tienda')})            
        .catch(error => res.send(error))
    },

    detail: (req, res) =>{
        db.Producto.findByPk(req.params.id,
        {
           include: ["marca"] 
        })

            .then(producto =>{
                res.render("productosDetail", {producto})
                
            })
    },

    edit: function(req, res) {
        const productoId = req.params.id;
        const promProductos = Productos.findByPk(productoId, { include: ["marca"] });
        const promMarcas = Marcas.findAll();

        Promise.all([promProductos, promMarcas])
        .then(([Producto, allMarcas]) => {            
            return res.render(path.resolve(__dirname, '..', 'views', 'productosEdit'), { Producto, allMarcas });
          })
          .catch(error => {
            res.send(error);
          });
    }
}

module.exports = productosController;