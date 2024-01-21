// Importación de módulos
const express = require('express');
const path = require("path");
const app = express();
const port = 5000;

// Importación de rutas definidas en archivos separados
const mainRoutes = require("./routes/main");
const productsRoutes = require("./routes/products");
const cartRoutes = require ("./routes/cart");

// Configuración para servir archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Configuración del motor de plantillas (EJS en este caso)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Uso de las rutas definidas en los archivos de rutas
app.use(mainRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`
    Servidor levantado correctamente en el puerto ${port}
    http://localhost:5000/
    `);
});
