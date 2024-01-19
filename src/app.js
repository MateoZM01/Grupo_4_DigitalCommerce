const express = require('express');
const path=require("path");
const app = express();
const port = 5000;
const mainRoutes = require("./routes/main");
const productsRoutes = require("./routes/products");
//const carritoRoutes = require ("./routes/cart");

app.use(express.static('public'));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"/views"));

app.use(mainRoutes);

app.use("/products",productsRoutes);

//app.use("/cart", carritoRoutes);

app.get("/product_detail", (req, res) => {
    res.sendFile(__dirname + "/views/product_Detail.html");
});

app.get('*', (req, res) => {
    res.send(`
    <h1>No existe esa página</h1>
    <h3><a href="/">Volver al Home</a></h3>
    `)
});

app.listen(port, () => {
    console.log(`
    Servidor levantado correctamente en el puerto ${port}
    http://localhost:5000/
    `);
});
