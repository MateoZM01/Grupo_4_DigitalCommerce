'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Servicios extends Model {
    static associate(models) {
      // Un servicio puede estar relacionado con varios pedidos
      Servicios.hasMany(models.Pedidos, { foreignKey: 'ServicioId' });
    }
  }

  Servicios.init({
    Nombre: DataTypes.STRING,
    Descripcion: DataTypes.TEXT,
    Precio: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Servicios',
  });

  return Servicios;
};
