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
    }
}

module.exports = productosController;