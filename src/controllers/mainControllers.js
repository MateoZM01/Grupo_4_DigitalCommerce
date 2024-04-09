const path = require('path');
const fs = require('fs');

const mainControllers = {
    // Controlador para la ruta principal ("/" o "home")
    index: (req, res) => {
        // Renderiza la vista llamada "index"
        res.render("index");
    },

};

// Exporta el objeto mainControllers para su uso en otros archivos
module.exports = mainControllers;