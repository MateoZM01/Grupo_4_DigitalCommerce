module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INT(15),
            primaryKey: true,
            allownull: false
        },
        nombre: {
            type: dataTypes.STRING(30),
            allownull: false
        },
        apellido: {
            type: dataTypes.STRING(30),
            allownull: false
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        contrasenia: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING(100),
            allownull: false
        },
        genero: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        categoria: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ciudad: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(100),
            allowNull: false
        }

    }

    let config = {
        tableName: 'usuarios',
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config)

    return Usuario

}