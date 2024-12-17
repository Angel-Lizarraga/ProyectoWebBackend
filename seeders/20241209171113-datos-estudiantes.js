'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Estudiantes', [
      {
        matricula: '12345',
        nombre: 'Jose Angel Lizarraga',
        semestre: '2019-2',
        creditos: 87,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '67890',
        nombre: 'Hugo Cazarez',
        semestre: '2018-2',
        creditos: 92,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matricula: '11223',
        nombre: 'Luis Alvarado',
        semestre: '2023-1',
        creditos: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Estudiantes', null, {});
  }
};
