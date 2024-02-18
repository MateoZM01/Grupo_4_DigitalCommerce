// CRUD de Productos
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


const adminControllers = require(path.resolve(__dirname, '../controllers/adminControllers'));

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

router.get('/products', adminControllers.index);
router.get('/products/create', adminControllers.create);
router.post('/products/create', upload.single('images'), adminControllers.save);
router.get('/products/detail/:id', adminControllers.show);
router.get('/products/:id/edit', adminControllers.edit);
router.post('/products/:id/edit', adminControllers.update);
router.get('/products/delete/:id', adminControllers.destroy);

module.exports = router;