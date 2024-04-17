module.exports = (sequelize, dataTypes) => {
    let alias = "Compra"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_usuario: {
            type: dataTypes.INT(15),
            foreignKey: true,
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
        tableName: 'compras',
        timestamps: false
    }

    const Compra = sequelize.define(alias, cols, config)

    Compra.associate = function (models) {
        Compra.belongsTo(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'id_usuario'
        }),
        
        Compra.belongsTo(models.Producto, {
            as: 'productos',
            foreignKey: 'id_producto'
        });
    }

    return Compra
};
