const controlador = {
    index: (req, res) => {
        res.render('index');
    },

    productCart: (req, res) => {
        res.render('./products/produc_detail');
    },

    productDetail: (req, res) => {
        res.render('./products/detalleDePoducto');
    },

    login: (req, res) => {
        res.render('./users/login');
    },

    register: (req, res) => {
        res.render('./users/register');
    },

    productCreate: (req, res) => {
        res.render('./products/admin-createProducts')
    },

    productEdit: (req, res) => {
        res.render('./products/admin-editProducts')
    }
}

module.exports = controlador;