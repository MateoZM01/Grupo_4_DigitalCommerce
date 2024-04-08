const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function getUsers(){
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

const usersControllers = {

  index: (req, res) => {
    const users = req.session.users;
    // Renderiza la vista llamada "index"
    res.render("index", { errors: [], users });
  },

  store: (req, res) => {
    const error = validationResult(req);

    req.session.users = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age
    }
    res.render("index", { errors: error.errors, users });
  },

  create: (req, res) => {
    res.render('register');
  },

  save: (req, res) => {
    const users = getUsers();

    const image = req.file ? req.file.filename : 'default-profile-image.png';

    const nuevoUsuario = {
      id: users[users.length - 1.].id + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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

  register: (req, res) => {
    // Renderiza la vista llamada "login"
    res.render("register");
  },

}

module.exports = usersControllers;