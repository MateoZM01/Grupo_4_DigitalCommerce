const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const methodOverride = require('method-override');
const { check } = require('express-validator');

// Multer - manejo del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/users'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
// Instancia del Multer para manejar los métodos
const upload = multer({ storage })

const usersControllers = require("../controllers/usersControllers");

router.get('/users', usersControllers.index);
router.post('/users',
    [
        check('email').isEmail().withMessage('Debe introducir un email válido.'),
        check('password').isLength({ min: 8 }).withMessage('Debe introducir una contraseña más larga.'),
    ],
    usersControllers.store);

// Para renderizar la vista "register"
router.get('/register', usersControllers.register);

// CREATE ONE USER
router.get('/users/create/', usersControllers.create);
router.post('/users', upload.single('image'), usersControllers.save);

module.exports = router;