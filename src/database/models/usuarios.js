'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
      // Un usuario puede tener muchos pedidos
      Usuarios.hasMany(models.Pedidos, { foreignKey: 'IDUsuario' });

      // Un usuario puede dejar muchos comentarios/valoraciones
      Usuarios.hasMany(models.ComentariosValoraciones, { foreignKey: 'IDUsuario' });
    }
  }

  Usuarios.init({
    Nombre: DataTypes.STRING,
    Apellido: DataTypes.STRING,
    CorreoElectronico: DataTypes.STRING,
    Contraseña: DataTypes.STRING,
    Direccion: DataTypes.STRING,
    Ciudad: DataTypes.STRING,
    Pais: DataTypes.STRING,
    Telefono: DataTypes.STRING,
    TipoUsuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuarios',
  });

  return Usuarios;
};
