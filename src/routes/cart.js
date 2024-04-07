const { Router } = require("express");
const cartControllers = require("../controllers/cartControllers");
const router = Router();

const cartRoutes = {
    
    cart: "/",
    
};

router.get('/cart', cartControllers.productCart);

module.exports = router;