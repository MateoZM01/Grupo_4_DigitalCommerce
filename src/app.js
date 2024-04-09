// Importación de módulos
const express = require('express');
const path = require("path");
const app = express();
const port = 4000;
const methodOverride = require('method-override');
const session = require("express-session");

// Importación de rutas definidas en archivos separados
const mainRoutes = require("./routes/main");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");

// Configuración del motor de plantillas (EJS en este caso)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Configuración para servir archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Esto nos permite poder enviar datos desde el POST por el método PUT y el método DELETE
app.use(methodOverride('_method'));

// URL encode - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

// Configuración de session
app.use(session({
    secret: "abc123", // Secreto para firmar la cookie de sesión
    resave: false, // Evitar guardar sesiones que no han sido modificadas
    saveUninitialized: false // Evitar crear sesiones para peticiones que no las inicializan
}));

// Uso de las rutas definidas en los archivos de rutas
app.use("/", mainRoutes);
app.use("/", productsRoutes);
app.use("/", usersRoutes);

app.get('*', (req, res) => {
    res.send(`
    <h1>No existe esa página</h1>
    <h3><a href="/">Volver al Home</a></h3>
    `)
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`
    Servidor levantado correctamente en el puerto ${port}
    http://localhost:${port}/
    `);
});