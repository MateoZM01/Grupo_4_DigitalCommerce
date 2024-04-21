module.exports = (sequelize, DataTypes) => {
    const alias = 'Publisher';
    const cols = {
        publisher_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    };
    const config = {
        tableName: 'publishers',
        timestamps: false
    };
    
    const Publisher = sequelize.define(alias, cols, config);

    Publisher.associate = function(models) {
        Publisher.hasMany(models.Book, {
            as: 'book',
            foreignKey: 'publisher_id'
        });
    };

    return Publisher;
};