const path = require('path');
const fs = require('fs');

const mainControllers = {
    // Controlador para la ruta principal ("/" o "home")
    index: (req, res) => {
        // Renderiza la vista llamada "home"
        res.render("index");
    },

    // Controlador para la ruta de inicio de sesión ("/login")
    login: (req, res) => {
        // Renderiza la vista llamada "login"
        res.render("login");
    },

    // Controlador para la ruta de registro ("/register")
    register: (req, res) => {
        // Renderiza la vista llamada "register"
        res.render("register");
    },

};

// Exporta el objeto mainControllers para su uso en otros archivos
module.exports = mainControllers;