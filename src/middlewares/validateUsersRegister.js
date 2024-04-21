const { body } = require('express-validator'); // Importación de express-validator para definir reglas de validación
const path = require('path'); // Importación del módulo path de Node.js para trabajar con rutas de archivos
const db = require('../database/models'); // Importación del modelo de base de datos

// Definición de reglas de validación para el registro de usuarios
let validationsRegister = [
    // Regla de validación para Nombre y Apellido
    body('nombreApellido')
        .notEmpty().withMessage('Tienes que escribir un Nombre y Apellido').bail()
        .isLength({min: 2}).withMessage('Tu Nombre y Apellido son demasiado cortos'),

    // Regla de validación para Nombre de usuario
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
                throw new Error('Ya existe un usuario con este Nombre de usuario');
            }
        }),

    // Regla de validación para Email
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
                throw new Error('Ya existe un usuario con este Email');
            }
        }),

    // Regla de validación para Fecha de Nacimiento
    body('fechaNacimiento')
        .notEmpty().withMessage('Tienes que elegir una Fecha de Nacimiento'),

    // Regla de validación para Domicilio
    body('domicilio')
        .notEmpty().withMessage('Tienes que escribir un Domicilio').bail()
        .isLength({min: 6}).withMessage('Tu Domicilio es demasiado corto'),

    // Regla de validación para Foto de Usuario
    body('foto').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtension = ['.jpg', '.jpeg', '.png', '.gif'];

        if(file && !acceptedExtension.includes(path.extname(file.originalname))) {
            throw new Error(
                'Extensión de archivo no soportado, use archivos JPG, JPEG, PNG o GIF'
            );
        };
        return true;
    }),

    // Regla de validación para Contraseña
    body('contrasena')
        .notEmpty().withMessage('Tienes que escribir una Contraseña').bail()
        .isLength({min: 8}).withMessage('Tu Contraseña es demasiado corta, debería tener al menos 8 caracteres').bail()
        .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage('Tu Contraseña debe tener por lo menos 1 minúscula, 1 mayúscula, 1 número y 1 símbolo'),

    // Regla de validación para Confirmar Contraseña
    body('confirmarContrasena')
        .notEmpty().withMessage('Tienes que Confirmar tu Contraseña'),
];

module.exports = validationsRegister; // Exportación de las reglas de validación
