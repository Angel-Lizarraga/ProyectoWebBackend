'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cursos', [
      {
        nombre: 'Matemáticas Avanzadas',
        clave: '1111',
        creditos: 6,
        profeID: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Introducción a la Física',
        clave: '2222',
        creditos: 4,
        profeID: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Historia Mundial',
        clave: '3333',
        creditos: 3,
        profeID: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cursos', null, {});
  }
};
