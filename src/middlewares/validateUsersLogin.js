const { body } = require('express-validator'); 
// o También const {check} = require('express-validator'); 
const db = require('../database/models');


let validationsLogin = [
    //Email
    body('email')
    .notEmpty().withMessage('Tienes que ingresar un Email').bail()
    .isEmail().withMessage('Tienes que escribir un Email válido')
    .custom(async (value, { req }) => {
        const existingUser = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });
         if (!existingUser) {
           // Will use the below as the error message
           throw new Error('Este Email no está registrado');
         }
      }),

    //Contraseña
    body('contrasena')
    .notEmpty().withMessage('Tienes que ingresar una Contraseña')
];

module.exports = validationsLogin;