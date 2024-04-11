const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const productsControllers = require("../controllers/productsControllers");

// Requerir Multer
const upload = require('../middlewares/productsMulterMiddleware');

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