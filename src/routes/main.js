// Importando el objeto Router de Express
const express = require("express");

// Creando una instancia de Router
const router = express.Router();

// Importando los controladores definidos en mainControllers
const mainControllers = require("../controllers/mainControllers");

// Mapeando las rutas a los controladores correspondientes
router.get('/', mainControllers.index);
router.get('/login', mainControllers.login);

// Ruta para manejar cualquier otra solicitud (404)
// router.get('*', (req, res) => {
//     res.send(`
//     <h1>No existe esa página</h1>
//     <h3><a href="/">Volver al Home</a></h3>
//     `)
// });


// Exportando el router para su uso en otras partes de la aplicación
module.exports = router;
