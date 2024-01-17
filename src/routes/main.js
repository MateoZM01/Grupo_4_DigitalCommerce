const { Router } = require("express")
const router = Router()
// Importando los controladores
const mainControllers = require("../controllers/mainControllers")
//Definiendo las rutas
const mainRoutes = {
    home: "/",
    cart: "/cart",
    login:'/login',
    register: '/register',
    carrito: '/carrito',
}
//Mapeando las rutas a los controladores
router.get(mainRoutes.home, mainControllers.home);
router.get(mainRoutes.login, mainControllers.login);
router.get(mainRoutes.register, mainControllers.register);
router.get(mainRoutes.cart,mainControllers.cart);
//Exportando el router
module.exports = router