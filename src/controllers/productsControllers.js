const path = require('path');
const fs = require('fs');
const { log } = require('console');

const productsFilePath = path.join(__dirname, '../data/products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function getProducts(){
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const productsControllers = {

  index: (req, res) => {
    const productos = getProducts();
    
    res.render('admin', { productos });

  },
  create: (req, res) => {
    res.render('crearProducto');
  },
  save: (req, res) => {
    const productos = getProducts();

    const image = req.file ? req.file.filename : 'default-image.png';

    const nuevoProducto = {
      id: productos[productos.length - 1.].id + 1,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image,
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