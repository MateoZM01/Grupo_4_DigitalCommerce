module.exports = (sequelize, DataTypes) => {
    const alias = 'Book';
    const cols = {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        isbn: {
            type: DataTypes.BIGINT(13),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        pages: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER(4),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        author_id: {
            type: DataTypes.INTEGER(11),
            //allowNull: false,
            foreignKey: true
        },
        publisher_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        genre_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    };
    const config = {
        tableName: 'books',
        timestamps: false
    };
    
    const Book = sequelize.define(alias, cols, config);

    Book.associate = function(models) {
        Book.belongsTo(models.Author, {
            as: 'author',
            foreignKey: 'author_id'
        });
        Book.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genre_id'
        });
        Book.belongsTo(models.Publisher, {
            as: 'publisher',
            foreignKey: 'publisher_id'
        });
        Book.hasMany(models.Cart_Book, {
            as: 'cart_book',
            foreignKey: 'book_id'
        });

        Book.belongsToMany(models.Cart, {
            as: 'carts',
            through: 'Cart_Book',
            foreignKey: 'book_id',
            otherKey: 'cart_id',
            timestamps: false
        });
    };

    return Book;
};