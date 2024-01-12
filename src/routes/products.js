
const { Router } = require("express")
const router = Router()
const productsControllers = require("../controllers/productsControllers")
const productsRoutes = { index: "/",detail:"/detail/:id" }
router.get(productsRoutes.index, productsControllers.getAllProducts);
module.exports=router