'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Apellido: {
        type: Sequelize.STRING
      },
      CorreoElectronico: {
        type: Sequelize.STRING
      },
      Contraseña: {
        type: Sequelize.STRING
      },
      Direccion: {
        type: Sequelize.STRING
      },
      Ciudad: {
        type: Sequelize.STRING
      },
      Pais: {
        type: Sequelize.STRING
      },
      Telefono: {
        type: Sequelize.STRING
      },
      TipoUsuario: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};