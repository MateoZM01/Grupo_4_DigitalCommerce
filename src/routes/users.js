const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { check } = require('express-validator');

const upload = require('../middlewares/usersMulterMiddleware');
const guestMiddleware = require('../middlewares/guestMidleware');
const userMiddleware = require('../middlewares/userMiddleware');

const usersControllers = require("../controllers/usersControllers");

router.get('/users', usersControllers.index);

// CREATE ONE USER
router.get('/users/create/', usersControllers.create);

// EDIT USER
router.get('/users/:id/edit', usersControllers.edit);
router.put('/users/:id', upload.single('image'), usersControllers.update);

// DELETE ONE USER
router.get('/users/delete/:id', usersControllers.destroy);

// Rutas "register"
router.get('/register', guestMiddleware, usersControllers.register);
router.post('/users', upload.single('image'), usersControllers.save);

// Rutas "login"
router.get('/login', guestMiddleware, usersControllers.login);
router.post('/login', usersControllers.session);
router.get('/users/detail/:id', usersControllers.show)

// Rutas "profile"
router.get('/users/detail', userMiddleware, usersControllers.userDetail);

module.exports = router;