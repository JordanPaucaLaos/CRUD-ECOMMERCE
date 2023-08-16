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
    }
}

module.exports = productosController;