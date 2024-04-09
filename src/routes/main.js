// Importando el objeto Router de Express
const express = require("express");

// Creando una instancia de Router
const router = express.Router();

// Importando los controladores definidos en mainControllers
const mainControllers = require("../controllers/mainControllers");

// Mapeando las rutas a los controladores correspondientes
router.get('/', mainControllers.index);

// Exportando el router para su uso en otras partes de la aplicación
module.exports = router;
