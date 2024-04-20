module.exports = (sequelize, dataTypes) => {
    let alias = "Producto"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        precio: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        categoria: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        cantidad: {
            type: dataTypes.STRING(100),
            allowNull: true
        }

    }

    let config = {
        tableName: 'productos',
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = function (models) {
        Producto.hasMany(models.Compra, {
            as: 'compras',
            foreignKey: 'id_producto'
        });
    }

    return Producto
};