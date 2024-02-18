// Importación de módulos
const express = require('express');
const path = require("path");
const app = express();
const port = 4000;
const methodOverride = require('method-override');

//Esto nos permite poder enviar datos desde el POST  por el metodo PUT como por el metodo DELETE
app.use(methodOverride('_method'));

// Importación de rutas definidas en archivos separados
const mainRoutes = require("./routes/main");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const adminRoutes = require("./routes/admin");

// Configuración para servir archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Configuración del motor de plantillas (EJS en este caso)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

// Uso de las rutas definidas en los archivos de rutas
app.use(mainRoutes);
app.use("/", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/", adminRoutes);

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`
    Servidor levantado correctamente en el puerto ${port}
    http://localhost:${port}/
    `);
});