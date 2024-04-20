module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allownull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(50),
            allownull: false
        },
        apellido: {
            type: dataTypes.STRING(50),
            allownull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        contrasenia: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(100),
            allownull: false
        },
        genero: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,
            allowNull: false
        },
        categoria: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        ciudad: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        telefono: {
            type: dataTypes.STRING(100),
            allowNull: false
        }

    }

    let config = {
        tableName: 'usuarios',
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config)

    Usuario.associate = function (models) {
        Usuario.hasMany(models.Compra, {
            as: 'compras',
            foreignKey: 'id_usuario'
        });
    }

    return Usuario
};