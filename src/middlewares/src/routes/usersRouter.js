const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

const upload = require('../middlewares/userMulterMiddleware');
const guestMiddleware = require('../middlewares/guestMidleware');
const userMiddleware = require('../middlewares/userMiddleware');
const validationsRegister = require('../middlewares/validateUsersRegister');
const validationsLogin = require('../middlewares/validateUsersLogin');

//Register
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('foto'), validationsRegister, usersController.create);

//Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validationsLogin, usersController.session);

//Profile
router.get('/profile', userMiddleware, usersController.profile);
router.get('/logout', usersController.logout);

//Edit
router.get('/profile/edit', userMiddleware, usersController.edit);
router.post('/profile/edit', userMiddleware, upload.single('foto'), usersController.update);

//Email Register Verificator
router.get('/isEmailExist/:email', usersController.isEmailExist);

module.exports = router;