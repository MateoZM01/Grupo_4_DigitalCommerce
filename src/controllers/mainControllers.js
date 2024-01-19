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
    productCart: (req, res) => {
        res.render('./products/productCart');
            },
    productDetail: (req, res) => {
                res.render('./products/productDetail');
            },
                


}
module.exports = mainControllers