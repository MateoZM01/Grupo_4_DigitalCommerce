const path = require('path');
const fs = require('fs');
const { log } = require('console');

const productsFilePath = path.join(__dirname, '../data/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsControllers = {

  index: (req, res) => {
    let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
    res.render(path.resolve(__dirname, '../views/admin.ejs'), { productos })
  },
  create: (req, res) => {
    res.render(path.resolve(__dirname, '../views/crearProducto.ejs'))
  },
  save: (req, res) => {
    let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));

    let ultimoElemento = productos[productos.length - 1];

    let nuevoProducto = {
      id: ultimoElemento ? parseInt(ultimoElemento.id) + 1 : 1,
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
      description: req.body.description
    }
    productos.push(nuevoProducto)
    let nuevoProductoAGuardar = JSON.stringify(productos, null, 2);
    fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), nuevoProductoAGuardar);
    res.redirect('/products');
  },
  show: (req, res) => {
    let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
    let id = req.params.id;
    let miProducto;
    productos.forEach(producto => {
      if (producto.id == id) {
        miProducto = producto;
      }
    })
    res.render(path.resolve(__dirname, '../views/productDetail.ejs'), { miProducto })
  },
  edit: (req, res) => {
    let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
    let id = req.params.id;
    let productoAEditar = productos.find(producto => {
      return producto.id == id;
    })
    res.render(path.resolve(__dirname, '../views/editarProducto.ejs'), { productoAEditar })
  },
  update: (req, res) => {
    let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
    let id = req.params.id;
    req.body.id = id;
    let productoAActualizar = productos.map(producto => {
      if (producto.id == id) {
        return producto = req.body;
      }
      return producto;
    })
    console.log(productoAActualizar);
    let productoActualizado = JSON.stringify(productoAActualizar, null, 2)
    fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), productoActualizado);
    res.redirect('/products');
  },
  destroy: (req, res) => {
    let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
    let id = req.params.id;
    let productoFinal = productos.filter(producto => producto.id != id);
    let productoGuardarFinal = JSON.stringify(productoFinal, null, 2);
    fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), productoGuardarFinal);
    res.redirect('/products');
  }
}
// Exporta el objeto productsControllers para su uso en otros archivos
module.exports = productsControllers;