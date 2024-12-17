'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profesores', [
      {
        nombre: 'Dr. John Smith',
        matEmpleado: '0741',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Dra. Lisa Brown',
        matEmpleado: '0731',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Dr. Miguel Gomez',
        matEmpleado: '0721',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profesores', null, {});
  }
};
