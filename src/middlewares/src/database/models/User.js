module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const cols = {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        adress: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        admin: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 0
        }
    };
    const config = {
        tableName: 'users',
        timestamps: false
    };
    
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsTo(models.Cart, {
            as: 'user',
            foreignKey: 'user_id'
        });
    };

    return User;
};