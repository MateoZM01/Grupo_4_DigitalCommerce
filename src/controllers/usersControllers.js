const path = require('path');
const fs = require('fs');
const { log } = require('console');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersControllers = {

    index: (req, res) => {
        const users = req.session.users;
        // Renderiza la vista llamada "index"
        res.render("index", { users });
    },

    store: (req, res) => {
        req.session.users = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age
        }
        res.redirect('/');
    },

    register: (req, res) => {
        // Renderiza la vista llamada "login"
        res.render("register");
    },

}

module.exports = usersControllers;