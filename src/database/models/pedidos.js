'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedidos extends Model {
    static associate(models) {
      // Un pedido pertenece a un usuario
      Pedidos.belongsTo(models.Usuarios, { foreignKey: 'IDUsuario' });

      // Un pedido puede tener muchos detalles de pedido
      Pedidos.hasMany(models.DetallesPedido, { foreignKey: 'PedidoId' });
    }
  }

  Pedidos.init({
    IDUsuario: DataTypes.INTEGER,
    FechaHoraPedido: DataTypes.DATE,
    EstadoPedido: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pedidos',
  });

  return Pedidos;
};
