const { body } = require('express-validator'); 
// o También const {check} = require('express-validator'); 
const path = require('path');

let validations = [
    //Título
    body('titulo')
    .notEmpty().withMessage('Tienes que escribir un Título').bail()
    .isLength({min: 5}).withMessage('Tu Título es demasiado corto'),

    //Año
    body('anio')
    .notEmpty().withMessage('Tienes que escribir un Año').bail()
    .isLength({min: 4}).withMessage('Ingresa un Año válido'),

    //Autor
    body('autor')
    .notEmpty().withMessage('Tienes que incluir un Autor').bail()
    //Verificar que sea un autor válido
    ,

    //Descripción
    body('description')
    .notEmpty().withMessage('Tienes que escribir una Descripción').bail()
    .isLength({min: 20}).withMessage('Tu Descripción es demasiado corta'),

    //Género
    body('genero')
    .notEmpty().withMessage('Tienes que incluir un Género').bail(),

    //Cantidad de páginas
    body('cantidad_de_paginas')
    .notEmpty().withMessage('Tienes que escribir la Cantidad de páginas del libro'),

    //Precio
    body('price')
    .notEmpty().withMessage('Tienes que escribir el Precio'),

    //Editorial
    body('editorial')
    .notEmpty().withMessage('Tienes que incluir una Editorial'),

    //ISBN
    body('ISBN')
    .notEmpty().withMessage('Tienes que escribir un International Standard Book Number (ISBN)').bail()
    .isLength({min: 13}).withMessage('Tu International Standard Book Number (ISBN) es demasiado corto'),

    //Stock
    body('stock')
    .notEmpty().withMessage('Tienes que escribir un número de Stock'),

    //imagenProducto
    body('imagenProducto').custom((value, { req }) => {
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
];

module.exports = validations;