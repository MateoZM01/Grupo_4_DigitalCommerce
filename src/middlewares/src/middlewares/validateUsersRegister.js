const { body } = require('express-validator'); 
// o También const {check} = require('express-validator'); 
const path = require('path');
const db = require('../database/models');


let validationsRegister = [
    //Nombre y Apellido
    body('nombreApellido')
    .notEmpty().withMessage('Tienes que escribir un Nombre y Apellido').bail()
    .isLength({min: 2}).withMessage('Tu Nombre y Apellido son demasiado cortos'),

    //Nombre de usuario
    body('nombreUsuario')
    .notEmpty().withMessage('Tienes que escribir un Nombre de usuario').bail()
    .isLength({min: 2}).withMessage('Tu Nombre de usuario es demasiado corto').bail()
    .custom(async (value, { req }) => {
        const existingUser = await db.User.findOne({
            where: {
                username: req.body.nombreUsuario
            }
        });
         if (existingUser) {
           // Will use the below as the error message
           throw new Error('Ya existe un usuario con este Nombre de usuario');
         }
      }),

    //Email
    body('email')
    .notEmpty().withMessage('Tienes que escribir un Email').bail()
    .isEmail().withMessage('Tienes que escribir un Email válido')
    .custom(async (value, { req }) => {
        const existingUser = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });
         if (existingUser) {
           // Will use the below as the error message
           throw new Error('Ya existe un usuario con este Email');
         }
      }),

    //Fecha de Nacimiento
    body('fechaNacimiento')
    .notEmpty().withMessage('Tienes que elegir una Fecha de Nacimiento'),

    //Domicilio
    body('domicilio')
    .notEmpty().withMessage('Tienes que escribir un Domicilio').bail()
    .isLength({min: 6}).withMessage('Tu Domicilio es demasiado corto'),

    //Foto de Usuario
    body('foto').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtension = ['.jpg', '.jpeg', '.png', '.gif'];
        //let fileExtension = path.extname(file.originalname); 
        //Al usar esta variable, luego tira un error de que originalname es indefined

        if(file && !acceptedExtension.includes(path.extname(file.originalname))) {
            throw new Error(
                'Extensión de archivo no soportado, use archivos JPG, JPEG, PNG o GIF'
                );
        };
        return true;
    }),

    //Contraseña
    body('contrasena')
    .notEmpty().withMessage('Tienes que escribir una Contraseña').bail()
    .isLength({min: 8}).withMessage('Tu Contraseña es demasiado corta, debería tener al menos 8 caracteres').bail()
    .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }
    ).withMessage('Tu Contraseña debe tener por lo menos 1 minúscula, 1 mayúscula, 1 número y 1 símbolo'),

    //Confirmar contraseña
    body('confirmarContrasena')
    .notEmpty().withMessage('Tienes que Confirmar tu Contraseña'),
  //agregar validacion de que sea igual a la contraseña

    /*//Aceptar los terminos y Servicios
    if (!form.terminosServicios.checked) {
        spans[8].innerHTML = "Tienes que Aceptar los terminos y Servicios";
        spans[8].id = "errors";
    };*/
];

module.exports = validationsRegister;