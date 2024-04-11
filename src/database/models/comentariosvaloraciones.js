'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ComentariosValoraciones extends Model {
    static associate(models) {
      // Un comentario/valoración pertenece a un usuario
      ComentariosValoraciones.belongsTo(models.Usuarios, { foreignKey: 'IDUsuario' });

      // Un comentario/valoración pertenece a un producto
      ComentariosValoraciones.belongsTo(models.Productos, { foreignKey: 'IDProducto' });
    }
  }

  ComentariosValoraciones.init({
    IDProducto: DataTypes.INTEGER,
    IDUsuario: DataTypes.INTEGER,
    Comentario: DataTypes.TEXT,
    Valoracion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ComentariosValoraciones',
  });

  return ComentariosValoraciones;
};
