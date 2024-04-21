// Se importa la función `body` (o alternativamente `check`) del paquete `express-validator`.
const { body } = require('express-validator');

// Se importa la conexión a la base de datos o el modelo de usuario (asumido que está en '../database/models').
const db = require('../database/models');

// Se crea un arreglo llamado `validationsLogin` que almacenará las validaciones para el inicio de sesión.

// Validaciones para el correo electrónico:
let validationsLogin = [
  body('email') // Se enfoca la validación en el campo `email` del cuerpo de la solicitud.
    .notEmpty().withMessage('Tienes que ingresar un Email').bail() // Verifica que el email no esté vacío y lanza un mensaje de error si lo está. `.bail()` detiene la validación si hay error.
    .isEmail().withMessage('Tienes que escribir un Email válido') // Comprueba si el formato del email es correcto (ej. usuario@ejemplo.com) y lanza un mensaje de error si no lo es.
    .custom(async (value, { req }) => { // Función de validación personalizada asíncrona para el email.
      const existingUser = await db.User.findOne({ // Busca un usuario existente con el email ingresado.
        where: {
          email: req.body.email
        }
      });
      if (!existingUser) { // Si no se encuentra el usuario, lanza un error indicando que el email no está registrado.
        throw new Error('Este Email no está registrado');
      }
    }),

  // Validaciones para la contraseña:
  body('contrasena') // Se enfoca la validación en el campo `contrasena` del cuerpo de la solicitud.
    .notEmpty().withMessage('Tienes que ingresar una Contraseña') // Verifica que la contraseña no esté vacía y lanza un mensaje de error si lo está.
];

// Se exporta el arreglo `validationsLogin` para que pueda ser utilizado en otras partes de la aplicación.
module.exports = validationsLogin;
