// Objeto productsControllers que contiene funciones relacionadas con productos
const productsControllers = {
    // Controlador para obtener todos los productos
    getAllProducts: (req, res) => {
        // Renderiza la vista llamada "home"
        res.render("home");
    },
    // Controlador para la ruta del detalle del producto ("/productDetail")
    productDetail: (req, res) => {
        // Renderiza la vista llamada "productDetail" en la carpeta "products"
        res.render('productDetail');
    }
};


// Exporta el objeto productsControllers para su uso en otros archivos
module.exports = productsControllers;
