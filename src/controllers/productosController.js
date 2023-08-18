const db = require("../database/models");
const path = require("path");
const fs = require("fs");
const {	validationResult} = require('express-validator');

//modelos
const Productos = db.Producto;
const Marcas = db.Marca;

const productosController = {
    list: (req, res) => {
        db.Producto.findAll({
            include: ["marca"]
        })

            .then(productos => {
                res.render("tienda", { productos })
            })
    },

    add: function (req, res) {
        let promMarcas = Marcas.findAll();

        Promise
            .all([promMarcas])
            .then(([allMarcas]) => {
                return res.render(path.resolve(__dirname, '..', 'views', 'productosAdd'), { allMarcas })
            })
            .catch(error => res.send(error))
    },
    //store
    /*create: function (req,res){
        Productos.create({
            nombre_prod: req.body.nombre_prod,
            precio_prod: req.body.precio_prod,
            id_marca: req.body.id_marca
        })
        .then(()=> {
            return res.redirect('/tienda')})            
        .catch(error => res.send(error))
    },*/

    create: function (req, res)  {

        let result = validationResult(req);

        if (result.errors.length == 0) {

             Productos.create({
                nombre_prod: req.body.nombre_prod,
                precio_prod: req.body.precio_prod,
                id_marca: req.body.id_marca,
                nombre_imagen: req.file ? req.file.filename : 'zapatilla_default.jpg',
                
            });      
            
                res.redirect("/tienda")
        }
        else {

            res.render("productosAdd", { Productos,session: req.session, errors: result.errors })
        }
    },



    detail: (req, res) => {
        db.Producto.findByPk(req.params.id,
            {
                include: ["marca"]
            })

            .then(producto => {
                res.render("productosDetail", { producto })

            })
    },

    edit: function (req, res) {
        const productoId = req.params.id;
        const promProductos = Productos.findByPk(productoId, { include: ["marca"] });
        const promMarcas = Marcas.findAll();

        Promise.all([promProductos, promMarcas])
            .then(([Producto, allMarcas]) => {
                return res.render(path.resolve(__dirname, '..', 'views', 'productosEdit'), { Producto, allMarcas });
            })
            .catch(error => {
                res.send(error)
            })
    },

    update: function (req, res) {
        const productoId = req.params.id;
        Productos.update({
            nombre_prod: req.body.nombre_prod,
            precio_prod: req.body.precio_prod,
            id_marca: req.body.id_marca,
        },
            {
                where: { id: productoId }
            })
            .then(() => {
                return res.redirect('/tienda')
            })
            .catch(error => res.send(error))
    },

    destroy: function (req, res) {
        const productoId = req.params.id;
        Productos.findByPk(productoId)
            .then(() => {
                Productos.destroy({ where: { id: productoId } })
                return res.redirect('/tienda')
            })
            .catch(error => res.send(error))
    }


}

module.exports = productosController;