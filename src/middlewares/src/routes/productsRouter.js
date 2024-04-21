const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/productMulterMiddleware');
const validations = require('../middlewares/validateProducts')


router.get('/', productsController.products);


router.get('/carrito', productsController.productCart);


router.get('/create', productsController.create);
router.post('/create', upload.single('imagenProducto'), validations, productsController.store);


router.get('/:id', productsController.detail);


router.get('/:id/edit', productsController.edit);
router.put('/:id', upload.single('imagenProducto'), productsController.update);


router.delete('/delete/:id', productsController.destroy);

module.exports = router;