const path = require('path');
const multer = require('multer');

// Multer - manejo del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/users'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Instancia del Multer para manejar los métodos
const upload = multer({ storage })

module.exports = upload;