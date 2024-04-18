const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { check } = require('express-validator');

const upload = require('../middlewares/usersMulterMiddleware');
const guestMiddleware = require('../middlewares/guestMidleware');
const userMiddleware = require('../middlewares/userMiddleware');

const usersControllers = require("../controllers/usersControllers");

// Lista de usuarios
router.get('/users', usersControllers.users);

// Perfil de un usuario
router.get('/users/detail', userMiddleware, usersControllers.userDetail);

// Crear un usuario
router.get('/users/create/', usersControllers.create);
router.post('/users', upload.single('imagen'), usersControllers.save);

// Editar un usuario
router.get('/users/:id/edit', usersControllers.edit);
router.put('/users/:id', upload.single('imagen'), usersControllers.update);

// Eliminar un usuario
router.get('/users/delete/:id', usersControllers.destroy);

// Ruta "register"
router.get('/register', guestMiddleware, usersControllers.register);

// Rutas "login"
router.get('/login', guestMiddleware, usersControllers.login);
router.post('/login', usersControllers.session);
router.get('/users/detail/:id', usersControllers.show)

module.exports = router;