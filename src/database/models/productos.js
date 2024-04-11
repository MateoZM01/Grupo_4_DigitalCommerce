'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    static associate(models) {
      // Un producto pertenece a una categoría
      Productos.belongsTo(models.Categorias, { foreignKey: 'CategoriaId' });

      // Un producto pertenece a una marca
      Productos.belongsTo(models.Marcas, { foreignKey: 'MarcaId' });
      
      // Un producto puede tener muchos comentarios/valoraciones
      Productos.hasMany(models.ComentariosValoraciones, { foreignKey: 'ProductoId' });
    }
  }

  Productos.init({
    Nombre: DataTypes.STRING,
    Descripcion: DataTypes.TEXT,
    Precio: DataTypes.DECIMAL,
    StockDisponible: DataTypes.INTEGER,
    CategoriaId: DataTypes.INTEGER, // Foreign key para la relación con Categorias
    MarcaId: DataTypes.INTEGER, // Foreign key para la relación con Marcas
    Imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Productos',
  });

  return Productos;
};
