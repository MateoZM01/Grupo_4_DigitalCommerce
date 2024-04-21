const db = require('../database/models');

/*const fs = require('fs');
const path = require('path');
const books = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json')));
*/

const controlador = {
    index: (req, res) => {
        db.Book.findAll({
            include: [
                { association: 'author' },
                { association: 'genre' },
                { association: 'publisher' }
            ]
        })
        .then((books) => {
            //console.log(books[0].dataValues);
            res.render('index', {books});
        })
        .catch(error => console.log(error));
    }
}

module.exports = controlador;
