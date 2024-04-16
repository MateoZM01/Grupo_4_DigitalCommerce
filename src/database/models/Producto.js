module.exports = (sequelize, dataTypes) => {
    let alias = "Producto"
    let cols = {
        id: {
            type: dataTypes.INT(15),
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        categoria: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    }

    let config = {
        tableName: 'productos',
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config)

    return Producto

}