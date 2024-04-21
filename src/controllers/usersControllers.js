const db = require('../database/models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
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
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasenia: bcrypt.hashSync(contrasenia, 10),
        imagen,
        categoria: req.body.categoria,
        genero: req.body.genero,
        fecha_nacimiento: req.body.fecha_nacimiento,
        pais: req.body.pais,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
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
    const { contrasenia } = req.body;
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
        imagen: req.file.filename,
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
    Usuarios.destroy({ where: { id: id }, force: true })
      .then(() => {
        return res.redirect('/users')
      })
  },
  session: (req, res) => {
    const { email, contrasenia } = req.body;
  
    Usuarios.findOne({ where: { email: email } })
      .then(userFound => {
        if (!userFound || !bcrypt.compareSync(contrasenia, userFound.contrasenia)) {
          return res.redirect('/login?error=true');
        }
  
        // No incluir la contraseña en la sesión
        const { contrasenia, ...userData } = userFound.toJSON();
        req.session.userLogged = userData;
        res.redirect('/');
      })
      .catch(err => {
        console.error('Error al iniciar sesión:', err);
        res.status(500).send('Error interno del servidor');
      });
  },
  

  

  userDetail: (req, res) => {
    res.render('userDetail', { usuario: req.session.userLogged });
  },

}

module.exports = usersControllers;