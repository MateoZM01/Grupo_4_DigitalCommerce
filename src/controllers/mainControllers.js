const mainControllers = {
    home: (req, res) => {
        res.render("home");
    },
    login: (req, res) => {
        res.render("login");
    },
    register:  (req, res) => {
        res.render("register");
    },
    car: (req, res) => {
        res.render("carrito"); 
    },
}
module.exports = mainControllers