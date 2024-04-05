const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const methodOverride = require('method-override')

const productsControllers = require("../controllers/productsControllers");

const productsFilePath = path.join(__dirname, '../data/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'))
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`
        console.log(filename)
        cb(null, filename)
    }
})
const upload = multer({storage})

// Definición de rutas para productos

router.get('/products', productsControllers.index);
router.get('/products/create', productsControllers.create);
router.post('/products/create', upload.single('images'), productsControllers.save);
router.get('/products/detail/:id', productsControllers.show);
router.get('/products/:id/edit', productsControllers.edit);
router.post('/products/:id/edit', productsControllers.update);
router.get('/products/delete/:id', productsControllers.destroy);

module.exports = router;