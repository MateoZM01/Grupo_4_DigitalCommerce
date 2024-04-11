'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetallesPedido extends Model {
    static associate(models) {
      // Un detalle de pedido pertenece a un pedido
      DetallesPedido.belongsTo(models.Pedidos, { foreignKey: 'IDPedido' });

      // Un detalle de pedido pertenece a un producto
      DetallesPedido.belongsTo(models.Productos, { foreignKey: 'IDProducto' });
    }
  }

  DetallesPedido.init({
    IDPedido: DataTypes.INTEGER,
    IDProducto: DataTypes.INTEGER,
    Cantidad: DataTypes.INTEGER,
    PrecioUnitario: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'DetallesPedido',
  });

  return DetallesPedido;
};
