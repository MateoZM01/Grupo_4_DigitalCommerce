const express = require('express');
const router = express.Router();
const productsControllers = require("../controllers/productsControllers");

// Requerir Multer
const upload = require('../middlewares/productsMulterMiddleware');

// Ruta para carrito
router.get('/cart', productsControllers.productCart);

// Obtener todos los productos
router.get('/products', productsControllers.products);

// Obtener un producto específico
router.get('/products/detail/:id', productsControllers.show); //detail

// Crear un producto
router.get('/products/create/', productsControllers.create); //add
router.post('/products', upload.single('imagen'), productsControllers.save); //create

// Editar un producto
router.get('/products/:id/edit', productsControllers.edit);
router.put('/products/:id',  upload.single('imagen'), productsControllers.update);

// Eliminar un producto
router.get('/products/delete/:id', productsControllers.destroy);

module.exports = router;