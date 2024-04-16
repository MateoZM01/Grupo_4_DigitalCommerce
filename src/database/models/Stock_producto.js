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

    return Stock_producto

}
