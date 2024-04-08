const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

let usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));

let books = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json')));

const usersController = {
    login: (req, res) => {
        res.render('./users/login.ejs');
    },

    session: (req, res) => {
        let { nombreUsuario, contrasena } = req.body;
        let userFound = users.find(user => user.nombreUsuario == nombreUsuario);

        if (userFound) {
            if (bcrypt.compareSync(contrasena, userFound.contrasena)) {
                //proteger la contraseña
                userFound.contrasena = null;

                //Crear la sesión
                req.session.userLogged = userFound;

                return res.redirect('/');
            }

        }
        res.send('<h1>El usuario y/o contraseña son incorrectos</h1><button><a href="/users/login">Volver a logearse</a></button>');
    },

    register: (req, res) => {
        res.render('./users/register.ejs');
    },

    create: (req, res) => {
        const { nombreApellido, nombreUsuario, email, fechaNacimiento, domicilio, contrasena } = req.body
        let userFound = users.find(user => user.email == email);
        if (userFound) return res.send('<h1>Este mail ya está siendo usado</h1>');
        const newUser = {
            //Por seguridad no usar el spread operator "...req.body"
            //Porque se pueden agregar inputs indeseados al JSON
            id: Date.now(),
            nombreApellido,
            nombreUsuario,
            email,
            fechaNacimiento,
            domicilio,
            //encriptar contraseña
            contrasena: bcrypt.hashSync(contrasena, 10),
            category: 'User',
            foto: `http://localhost:4050/images/users/${req.file?.filename ||
                'default-image.jpg'}`
        }
        users.push(newUser);

        let usersJSON = JSON.stringify(users, null, ' ');
        fs.writeFileSync(usersFilePath, usersJSON);

        res.redirect('/');
    },

    profile: (req, res) => {
        res.render('./users/profile.ejs', { user: req.session.userLogged, books });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = usersController;