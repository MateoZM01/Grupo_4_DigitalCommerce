const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

const Usuarios = db.Usuario;
const Productos = db.Producto;

const apiControllers = {
    allUsers: (req, res) => {
        Usuarios.findAll()
            .then(usuarios => {
                let users = usuarios.map(usuario => ({
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    detail: `http://localhost:4000/usuarios/${usuario.id}`
                }));

                let estructura = {
                    count: usuarios.length,
                    users: users
                };
                res.json(estructura);
            })
    },

    userDetail: (req, res) => {
        db.Usuario.findByPk(req.params.id, {
            attributes: { exclude: ['contrasenia', 'categoria'] }
        })
            .then(usuario => {
                let datosId = {
                    meta: {
                        status: 200,
                        imagenPerfil: `http://localhost:4000/usuarios/${usuario.id}/imagen`
                    },
                    user: usuario
                }
                res.json(datosId)
            })
    },

    allProducts: (req, res) => {
        Productos.findAll()
            .then(productos => {
                let products = productos.map(producto => ({
                    id: producto.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    categoria: producto.categoria,
                    detail: `http://localhost:4000/poductos/${producto.id}`
                }));

                let countByCategory = {};

                products.forEach(producto => {
                    if (countByCategory[producto.categoria]) {
                        countByCategory[producto.categoria]++;
                    } else {
                        countByCategory[producto.categoria] = 1;
                    }
                });

                let estructuraP = {
                    count: productos.length,
                    countByCategory: countByCategory,
                    products: products
                };
                res.json(estructuraP);
            })
    },

    productDetail: (req, res) => {
        db.Producto.findByPk(req.params.id, {
            include: [ { association: 'compras' } ]
        })
            .then(producto => {
                let productId = {
                    meta: {
                        status: 200,
                        imagenPerfil: `http://localhost:4000/productos/${producto.id}/imagen`
                    },
                    product: producto
                }
                res.json(productId)
            })
    }
}

module.exports = apiControllers;