const path = require('path');
const fs = require('fs');

const mainControllers = {
    // Controlador para la ruta principal ("/" o "home")
    index: (req, res) => {
        // Renderiza la vista llamada "index"
        res.render("index");
    },

    // Controlador para la ruta de inicio de sesión ("/login")
    login: (req, res) => {
        // Renderiza la vista llamada "login"
        res.render("login");
    },

};

// Exporta el objeto mainControllers para su uso en otros archivos
module.exports = mainControllers;