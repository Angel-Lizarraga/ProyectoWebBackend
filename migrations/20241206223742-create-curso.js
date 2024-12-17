'use strict';
/** @type {import('sequelize-cli').Migration} */
// models/curso.js - Migración
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cursos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clave: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      creditos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,  // Asegurando que no sea nulo
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        allowNull: false,  // Asegurando que no sea nulo
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cursos');
  }
};