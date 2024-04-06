const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function getProducts(){
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}
// Definiendo un objeto llamado mainControllers
const mainControllers = {
    // Controlador para la ruta principal ("/" o "home")
    home: (req, res) => {
        const productos = getProducts();
        // Renderiza la vista llamada "home"
        res.render("home");
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