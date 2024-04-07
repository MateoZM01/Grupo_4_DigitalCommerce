const cartControllers = {
    //Controlador para la ruta del carrito de productos ("/productCart")
    productCart: (req, res) => {

        res.render('productCart');
    },

};

module.exports = cartControllers;