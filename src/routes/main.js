const { Router } = require("express")
const router = Router()
const mainControllers = require("../controllers/mainControllers")
const mainRoutes = {
    home: "/",
    cart: "/cart",
    login:'/login',
    register: '/register',
}

router.get(mainRoutes.home, mainControllers.home);
router.get(mainRoutes.login, mainControllers.login);
router.get(mainRoutes.register, mainControllers.register);

module.exports = router