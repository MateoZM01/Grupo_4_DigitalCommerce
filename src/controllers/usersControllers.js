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
    const usuarios = getUsers();

    res.render('users', { usuarios });
  },
  
  register: (req, res) => {
    // Renderiza la vista llamada "register"
    res.render("register");
  },

  login: (req, res) => {
    // Renderiza la vista llamada "login"
    res.render("login");
  },

  create: (req, res) => {
    const usuarios = getUsers();
    res.render('register');
  },

  save: (req, res) => {
    const usuarios = getUsers();

    const { password } = req.body;

    const image = req.file ? req.file.filename : 'default-profile-image.png';

    const nuevoUsuario = {
      id: usuarios[usuarios.length - 1.].id + 1,
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(password, 10),
      category: req.body.category,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      image,
    };

    usuarios.push(nuevoUsuario);
    fs.writeFileSync(usersFilePath, JSON.stringify(usuarios), {
      flag: 'w',
      encoding: 'utf-8',
    });

    res.redirect('/');
  },

  show: (req, res) => {
    const { id }= req.params;
    
    const usuarios = getUsers();

    const usuario = usuarios.find((usuario) => usuario.id == id);
    
    if (!usuario) {
      res.redirect('/');
    }

    res.render('userDetail', { usuario });
  },

  edit: (req, res) => {
    const usuarios = getUsers();
    const id = req.params.id;
    const usuario = usuarios.find((usuario) => usuario.id == id)
    if (!usuario) {
      return res.send("No se encontró el usuario");
    }
    res.render('editarUsuario', { usuario: usuario })
  },

  update: (req, res) => {
    const usuarios = getUsers();

    const id = req.params.id;
    usuarios.forEach((usuario) => {
      if (usuario.id == id) {
        usuario.id = Number(id);
        usuario.name = req.body.name;
        usuario.email = req.body.email;
        usuario.category = req.body.category;
        usuario.gender = req.body.gender;
        usuario.date_of_birth = req.body.date_of_birth;
        usuario.country = req.body.country;
        usuario.city = req.body.city;
        usuario.address = req.body.address;
        usuario.image = req.body.image ? req.body.image : usuario.image
      }
    });

    fs.writeFileSync(usersFilePath, JSON.stringify(usuarios), {
      flag: 'w',
      encoding: 'utf-8',
    });

    res.redirect('/users');
  },

  destroy: (req, res) => {
    const usuarios = getUsers();
    const id = req.params.id;
    const usuarioFiltrado = usuarios.filter(usuario => usuario.id != id);
    fs.writeFileSync(usersFilePath, JSON.stringify(usuarioFiltrado));
    res.redirect('/users');
  },

  session: (req, res) => {
    const usuarios = getUsers();

    const { email, password } = req.body;
    const userFound = usuarios.find(usuario => usuario.email == email);

    if (userFound) {
      if (bcrypt.compareSync(password, userFound.password)) {
        //proteger la contraseña
        userFound.password = null;

        //Crear la sesión
        req.session.userLogged = userFound;

        return res.redirect('/');
      }

    }
    res.send('<h1>El email y/o contraseña no son válidos</h1><button><a href="/login">Volver a loguearse</a></button>');
  },

  userDetail: (req, res) => {
    res.render('userDetail', { usuario: req.session.userLogged });
  },
  
}

module.exports = usersControllers;