// Importación de módulos
const express = require('express');
const path = require("path");
const app = express();
const port = 4000;
const methodOverride = require('method-override');
const session = require("express-session");

//Esto nos permite poder enviar datos desde el POST por el metodo PUT y el metodo DELETE
app.use(methodOverride('_method'));

// Importación de rutas definidas en archivos separados
const mainRoutes = require("./routes/main");
const cartRoutes = require("./routes/cart");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");

// Configuración para servir archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Configuración del motor de plantillas (EJS en este caso)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

// Configuración de token para uso de session
app.use(session ({ secret: "abc123" }));

// Uso de las rutas definidas en los archivos de rutas
app.use("/", mainRoutes);
app.use("/", cartRoutes);
app.use("/", productsRoutes);
app.use("/", usersRoutes);

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`
    Servidor levantado correctamente en el puerto ${port}
    http://localhost:${port}/
    `);
});