const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

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



app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
