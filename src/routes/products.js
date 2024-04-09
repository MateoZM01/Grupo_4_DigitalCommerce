const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Multer - manejo del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
// Instancia del Multer para manejar los métodos
const upload = multer({ storage })

const productsControllers = require("../controllers/productsControllers");

// Definición de rutas para productos

router.get('/cart', productsControllers.productCart);

// GET ALL PRODUCTS
router.get('/products', productsControllers.index);

// CREATE ONE PRODUCT
router.get('/products/create/', productsControllers.create);
router.post('/products', upload.single('image'), productsControllers.save);

// GET ONE PRODUCT
router.get('/products/detail/:id', productsControllers.show);

// EDIT ONE PRODUCT
router.get('/products/:id/edit', productsControllers.edit);
router.put('/products/:id',  upload.single('image'), productsControllers.update);

// DELETE ONE PRODUCT
router.get('/products/delete/:id', productsControllers.destroy);

module.exports = router;