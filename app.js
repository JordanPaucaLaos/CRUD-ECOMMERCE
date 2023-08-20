const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const db = require("./src/database/models")

const indexRouter = require('./src/routes/index');
const tiendaRouter = require('./src/routes/tiendaRoutes');
const blogRouter = require('./src/routes/blogRoutes');
const acercaRouter = require('./src/routes/acercaRoutes');
const contactoRouter = require('./src/routes/contactoRoutes');

global.__basedir = __dirname;

// view engine setup
app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use(tiendaRouter);
app.use(blogRouter);
app.use(acercaRouter);
app.use(contactoRouter);

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and Re-sync db.");
    db.Marca.bulkCreate([
        { nombre_marca: "Nike" },
        { nombre_marca: "Adidas" },
        { nombre_marca: "Reebok" },
        { nombre_marca: "Fila" }
    ]).then(() => console.log("Datos de marcas han sido guardados!!"));

    db.Producto.bulkCreate([
        {
            nombre_prod: "Zapatilla 1",
            precio_prod: 245.50,
            id_marca: 1,
            nombre_imagen: "zapatilla_default.jpg"
        },
        {
            nombre_prod: "Zapatilla 2",
            precio_prod: 345.50,
            id_marca: 2,
            nombre_imagen: "zapatilla_default.jpg"
        },
        {
            nombre_prod: "Zapatilla 3",
            precio_prod: 145.50,
            id_marca: 3,
            nombre_imagen: "zapatilla_default.jpg"
        }

    ]).then(() => console.log("Datos de productos han sido guardados!!"));

});

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
