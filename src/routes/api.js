const express = require('express');
const router = express.Router();
const apiControllers = require('../controllers/apiControllers');


// USUARIOS

// Todos los usuarios
router.get('/usuarios', apiControllers.allUsers);

// Un usuario específico
router.get('/usuarios/:id', apiControllers.userDetail);


// PRODUCTOS

// Todos los productos
router.get('/productos', apiControllers.allProducts);

// Un producto específico
router.get('/productos/:id', apiControllers.productDetail);

module.exports = router;