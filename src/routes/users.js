const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const methodOverride = require('method-override');

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

router.get('/register', usersControllers.register);
router.post('/login', usersControllers.store);

module.exports = router;