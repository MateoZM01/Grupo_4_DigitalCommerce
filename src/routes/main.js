// Importando el objeto Router de Express
const { Router } = require("express");

// Creando una instancia de Router
const router = Router();

// Importando los controladores definidos en mainControllers
const mainControllers = require("../controllers/mainControllers");

// Definiendo las rutas principales
const mainRoutes = {
    home: "/",
    cart: "/cart",
    login: '/login',
    register: '/register',
    productCart: '/productCart'
};

// Mapeando las rutas a los controladores correspondientes
router.get(mainRoutes.home, mainControllers.home);
router.get(mainRoutes.login, mainControllers.login);
router.get(mainRoutes.register, mainControllers.register);
// Ruta para manejar cualquier otra solicitud (404)
// router.get('*', (req, res) => {
//     res.send(`
//     <h1>No existe esa página</h1>
//     <h3><a href="/">Volver al Home</a></h3>
//     `)
// });


// Exportando el router para su uso en otras partes de la aplicación
module.exports = router;
