const express = require('express');const path=require("path")
const app = express();
const mainRoutes = require("./routes/main")
const productsRoutes = require("./routes/products")
app.use(express.static('public'));

app.set("view engine","ejs")

app.set("views",path.resolve(__dirname,"./views"))

app.use(mainRoutes)

app.use("/products",productsRoutes)

app.get("/product_detail", (req, res) => {
    res.sendFile(__dirname + "/views/product_Detail.html");
});

app.listen(5000, () => {
    console.log('Servidor Funcionando http://localhost:5000/');
});