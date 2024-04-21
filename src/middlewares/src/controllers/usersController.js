const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersController = {
    // Renderiza la vista de inicio de sesión
    login: (req, res) => {
        res.render('./users/login.ejs');
    },

    // Procesa el formulario de inicio de sesión y realiza la autenticación del usuario
    session: async (req, res) => {
        try {
            let { email, contrasena } = req.body;

            // Validar el formulario usando express-validator
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('./users/login.ejs', {
                    errors: resultValidation.mapped(), // Convertir el array de errores en un objeto
                    oldEmail: email // Conservar el correo electrónico ingresado por el usuario
                });
            };

            // Buscar usuario en la base de datos por email
            let userFound = await db.User.findOne({
                where: {
                    email: email,
                }
            });

            if (userFound) {
                // Comparar contraseñas utilizando bcrypt
                if (bcrypt.compareSync(contrasena, userFound.password)) {
                    // Proteger la contraseña antes de renderizar la vista
                    userFound.contrasena = null;

                    // Crear la sesión de usuario
                    req.session.userLogged = userFound;

                    // Redirigir al usuario a la página principal
                    return res.redirect('/');
                }
            }

            // Renderizar mensaje de error si la autenticación falla
            res.send('<h1>El usuario y/o contraseña son incorrectos</h1><button><a href="/users/login">Volver a logearse</a></button>');
        } catch (error) {
            console.log(error.message);
        }
    },

    // Renderiza la vista de registro
    register: (req, res) => {
        res.render('./users/register.ejs');
    },

    // Procesa el formulario de registro y crea un nuevo usuario en la base de datos
    create: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            console.log('error express validator', resultValidation.mapped());
            return res.render('./users/register.ejs', {
                errors: resultValidation.mapped(), // Convertir el array de errores en un objeto
                oldData: req.body // Conservar los datos ingresados por el usuario en el formulario
            });
        };

        const { nombreApellido, nombreUsuario, email, fechaNacimiento, domicilio, contrasena } = req.body;

        // Crear un nuevo usuario con la información del formulario
        const newUser = {
            fullname: nombreApellido,
            username: nombreUsuario,
            email: email,
            birthday: fechaNacimiento,
            adress: domicilio,
            password: bcrypt.hashSync(contrasena, 10), // Encriptar la contraseña antes de guardarla
            admin: 0,
            image: `${req.file?.filename || 'default-image.jpg'}` // Asignar una imagen por defecto si no se proporciona una
        }

        // Guardar el nuevo usuario en la base de datos
        db.User.create(newUser);

        // Redirigir al usuario a la página principal después del registro exitoso
        res.redirect('/');
    },

    // Renderiza la vista de perfil del usuario
    profile: (req, res) => {
        // Buscar todos los libros asociados al usuario y renderizar la vista de perfil
        db.Book.findAll({
            include: [
                { association: 'author' },
                { association: 'genre' },
                { association: 'publisher' }
            ]
        })
        .then(books => {
            res.render('./users/profile.ejs', { user: req.session.userLogged, books });
        })
        .catch(error => console.log(error.message));
    },

    // Destruye la sesión del usuario y redirige al usuario a la página principal
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    },

    // Renderiza la vista de edición de perfil del usuario
    edit: async (req, res) => {
        let loggedUser = req.session.userLogged.username;

        // Buscar al usuario actual en la base de datos y renderizar la vista de edición de perfil
        let userFound = await db.User.findOne({
            where: {
                username: loggedUser,
            }
        });

        res.render('./users/editUsers.ejs', { userFound });
    },

    // Procesa el formulario de edición de perfil y actualiza la información del usuario en la base de datos
    update: (req, res) => {
        const { nombreApellido, nombreUsuario, email, fechaNacimiento, domicilio, contrasena } = req.body;
        let loggedUser = req.session.userLogged.username;

        // Actualizar la información del usuario en la base de datos
        db.User.update({
            fullname: nombreApellido,
            username: nombreUsuario,
            email: email,
            birthday: fechaNacimiento,
            adress: domicilio,
            password: bcrypt.hashSync(contrasena, 10), // Encriptar la nueva contraseña antes de actualizarla
            admin: 0,
            image: `${req.file?.filename || 'default-image.jpg'}` // Asignar una imagen por defecto si no se proporciona una
        }, {
            where: { username: loggedUser }
        });

        // Redirigir al usuario a la página de perfil después de actualizar la información
        res.redirect('/users/profile');
    },

    // Verificar si un correo electrónico ya está registrado en la base de datos
    isEmailExist: async (req, res) => {
        try {
            const userEmail = req.params.email;

            // Buscar el correo electrónico en la base de datos
            const findedEmail = await db.User.findOne({
                where: {
                    email: userEmail
                }
            });

            // Enviar respuesta indicando si el correo electrónico existe o no
            if (!findedEmail) {
                return res.send(false);
            } else {
                return res.send(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
};

module.exports = usersController;
