// Objeto productsControllers que contiene funciones relacionadas con productos
const productsControllers = {
    // Controlador para obtener todos los productos
    getAllProducts: (req, res) => {
        // Renderiza la vista llamada "home"
        res.render("home");
    },
};

// Exporta el objeto productsControllers para su uso en otros archivos
module.exports = productsControllers;
