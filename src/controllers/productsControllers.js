const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');

const productsFilePath = path.join(__dirname, '../data/products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function getProducts() {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const productsControllers = {

  index: (req, res) => {
    const productos = getProducts();

    res.render('products', { productos });

  },
  //Controlador para la ruta del carrito de productos ("/productCart")
  productCart: (req, res) => {

    res.render('productCart');
  },

  create: (req, res) => {
    const productos = getProducts();
    res.render('crearProducto');
  },

  save: (req, res) => {
    const productos = getProducts();

    const image = req.file ? req.file.filename : 'default-image.png';

    const nuevoProducto = {
      id: productos[productos.length - 1.].id + 1,
      name: req.body.name,
      price: req.body.price,
      image,
      description: req.body.description,
      category: req.body.category
    };

    productos.push(nuevoProducto);
    fs.writeFileSync(productsFilePath, JSON.stringify(productos), {
      flag: 'w',
      encoding: 'utf-8',
    });

    res.redirect('/');
  },

  show: (req, res) => {
    const { id } = req.params;

    const productos = getProducts();

    const producto = productos.find((producto) => producto.id == id);

    if (!producto) {
      res.redirect('/');
    }

    res.render('productDetail', { producto })
  },

  edit: (req, res) => {
    const productos = getProducts();
    const id = req.params.id;
    const producto = productos.find((producto) => producto.id == id)
    if (!producto) {
      return res.send("No se encontró el producto");
    }
    res.render('editarProducto', { producto: producto })
  },

  update: (req, res) => {
    const productos = getProducts();

    const id = req.params.id;
    productos.forEach((producto) => {
      if (producto.id == id) {
        producto.id = Number(id);
        producto.name = req.body.name;
        producto.price = req.body.price;
        producto.category = req.body.category;
        producto.description = req.body.description;
        producto.image = req.body.image ? req.body.image : producto.image
      }
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(productos));

    res.redirect('/products');
  },

  destroy: (req, res) => {
    const productos = getProducts();
    const id = req.params.id;
    const productoFiltrado = productos.filter(producto => producto.id != id);
    fs.writeFileSync(productsFilePath, JSON.stringify(productoFiltrado));
    res.redirect('/products');
  },

};
// Exporta el objeto productsControllers para su uso en otros archivos
module.exports = productsControllers;