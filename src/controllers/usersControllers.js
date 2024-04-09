const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function getUsers() {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

const usersControllers = {

  index: (req, res) => {
    const users = req.session.users;
    // Renderiza la vista llamada "index"
    res.render("index", { errors: [], users });
  },

  register: (req, res) => {
    // Renderiza la vista llamada "login"
    res.render("register");
  },

  login: (req, res) => {
    // Renderiza la vista llamada "login"
    res.render("login");
  },

  create: (req, res) => {
    res.render('register');
  },

  save: (req, res) => {
    const users = getUsers();

    const { password } = req.body;

    const image = req.file ? req.file.filename : 'default-profile-image.png';

    const nuevoUsuario = {
      id: users[users.length - 1.].id + 1,
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(password, 10),
      age: req.body.age,
      image,
    };

    users.push(nuevoUsuario);
    fs.writeFileSync(usersFilePath, JSON.stringify(users), {
      flag: 'w',
      encoding: 'utf-8',
    });

    res.redirect('/');
  },

  session: (req, res) => {
    let { email, password } = req.body;
    let userFound = users.find(user => user.email == email);

    if (userFound) {
      if (bcrypt.compareSync(password, userFound.password)) {
        //proteger la contraseña
        userFound.password = null;

        //Crear la sesión
        req.session.userLogged = userFound;

        return res.redirect('/');
      }

    }
    res.send('<h1>El email y/o contraseña no son válidos</h1><button><a href="/users/login">Volver a loguearse</a></button>');
  },

  profile: (req, res) => {
    res.render('./users/profile.ejs', { user: req.session.userLogged, books });
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect('/');
  }

}

module.exports = usersControllers;