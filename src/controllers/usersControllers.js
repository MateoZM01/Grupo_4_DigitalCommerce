const db = require('../database/models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

/*const path = require('path');
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function getUsers() {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}*/

const Usuarios = db.Usuario;

const usersControllers = {

  users: (req, res) => {
    Usuarios.findAll({
      include: [
        { association: 'compras' }
      ]
    })
      .then(usuarios => {
        res.render('users', { usuarios });
      })
  },

  register: (req, res) => {
    res.render("register");
  },

  login: (req, res) => {
    res.render("login");
  },

  show: (req, res) => {
    Usuarios.findByPk(req.params.id)
      .then(usuario => {
        res.render('userDetail', { usuario });
      })
  },

  create: (req, res) => {
    res.render('register');
  },

  save: (req, res) => {
    const { contrasenia } = req.body;

    const imagen = req.file ? req.file.filename : 'default-profile-image.png';

    Usuarios.create(
      {
        id: Usuarios[Usuarios.length - 1.].id + 1,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasenia: bcrypt.hashSync(contrasenia, 10),
        categoria: req.body.categoria,
        genero: req.body.genero,
        fecha_nacimiento: req.body.fecha_nacimiento,
        pais: req.body.pais,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        imagen,
      }
    )
      .then(() => {
        return res.redirect('/')
      })
  },

  edit: (req, res) => {
    Usuarios.findByPk(req.params.id)
      .then((usuario) => {
        if (!usuario) {
          return res.send("No se encontró el usuario");
        };
        res.render('editarUsuario', { usuario })
      })
  },

  update: (req, res) => {
    const id = req.params.id;
    Usuarios.update(
      {
        id: Number(id),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasenia: bcrypt.hashSync(contrasenia, 10),
        categoria: req.body.categoria,
        genero: req.body.genero,
        fecha_nacimiento: req.body.fecha_nacimiento,
        pais: req.body.pais,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        imagen: req.body.imagen ? req.body.imagen : usuario.imagen
      },
      {
        where: { id: id }
      })
      .then(() => {
        return res.redirect('/')
      })
  },

  destroy: (req, res) => {
    const id = req.params.id;
    Usuarios.destroy({ where: { id: id }, force: true });
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