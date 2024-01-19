const { Router } = require("express");
const router = Router();
const productsControllers = require("../controllers/productsControllers");

// Definición de rutas para productos
const productsRoutes = {
    // Ruta para mostrar todos los productos
    index: "/",
    // Ruta para mostrar detalles de un producto específico usando un parámetro de ruta ":id"
    detail: "/detail/:id"
};

// Asociación de la ruta "/index" con la función getAllProducts del controlador productsControllers
router.get(productsRoutes.index, productsControllers.getAllProducts);

// Exportación del router para su uso en otros archivos
module.exports = router;
