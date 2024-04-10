const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const methodOverride = require('method-override');
const { check } = require('express-validator');

const upload = require('../middlewares/multerMiddleware');
const guestMiddleware = require('../middlewares/guestMidleware');
const userMiddleware = require('../middlewares/userMiddleware');

const usersControllers = require("../controllers/usersControllers");

router.get('/users', usersControllers.index);

// Rutas "register"
router.get('/register', guestMiddleware, usersControllers.register);
router.post('/users', upload.single('image'), usersControllers.save);
// CREATE ONE USER
router.get('/users/create/', usersControllers.create);

// Rutas "login"
router.get('/login', guestMiddleware, usersControllers.login);
router.post('/login', usersControllers.session);
router.get('/users/detail/:id', usersControllers.show)

router.get('/users/:id/edit', usersControllers.edit);
router.put('/users/:id',  upload.single('image'), usersControllers.update);

// Rutas "profile"
router.get('/profile', userMiddleware, usersControllers.profile);
router.get('/logout', usersControllers.logout);

module.exports = router;