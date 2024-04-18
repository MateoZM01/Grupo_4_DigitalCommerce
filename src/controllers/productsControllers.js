const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

/*const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function getProducts() {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}*/

const Productos = db.Producto;

const productsControllers = {

  products: (req, res) => {
    Productos.findAll()
      .then(productos => {
        res.render('products', { productos });
      })
  },

  show: (req, res) => {
    Productos.findByPk(req.params.id)
      .then(producto => {
        res.render('productDetail', { producto })
      })
  },

  productCart: (req, res) => {

    res.render('productCart');
  },

  create: (req, res) => {
    Productos.findAll()
      .then(productos => {
        res.render('crearProducto', { productos });
      })
  },

  save: (req, res) => {
    const imagen = req.file ? req.file.filename : 'default-image.png';

    Productos.create(
      {
        id: Productos[Productos.length - 1.].id + 1, // consultar nacho
        nombre: req.body.nombre,
        precio: req.body.precio,
        categoria: req.body.categoria,
        imagen,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
      }
    )
      .then(() => {
        return res.redirect('/')
      })
  },

  edit: (req, res) => {
    Productos.findByPk(req.params.id)
      .then((producto) => {
        if (!producto) {
          return res.send("No se encontró el producto");
        };
        res.render('editarProducto', { producto })
      })
  },

  update: (req, res) => {
    const id = req.params.id;
    Productos.update(
      {
        id: Number(id),
        nombre: req.body.nombre,
        precio: req.body.precio,
        categoria: req.body.categoria,
        // imagen: req.body.imagen ? req.body.imagen : producto.imagen, CONSULTAR NACHOO
        descripcion: req.body.descripcion,
      },
      {
        where: { id: id }
      })
      .then(() => {
        return res.redirect('/')
      })
  },

  destroy: (req, res) => {
    const id = req.params.id;
    Productos.destroy({ where: { id: id }, force: true });
  }

};

module.exports = productsControllers;