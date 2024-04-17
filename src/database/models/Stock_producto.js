module.exports = (sequelize, dataTypes) => {
    let alias = "Stock_producto"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_producto: {
            type: dataTypes.INT(15),
            foreignKey: true,
            allowNull: false
        },
        total: {
            type: dataTypes.TINYINT(4),
            allowNull: false
        }

    }

    let config = {
        tableName: 'stock_productos',
        timestamps: false
    }

    const Stock_producto = sequelize.define(alias, cols, config)

    Stock_producto.associate = function (models) {
        Stock_producto.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'id_producto'
        });
    }

    return Stock_producto
};
