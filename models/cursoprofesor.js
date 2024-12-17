'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CursoProfesor extends Model {
    static associate(models) {
      // Relación con Curso
      this.belongsTo(models.Curso, {
        foreignKey: 'cursoId',
        as: 'curso'
      });

      // Relación con Profesor
      this.belongsTo(models.Profesor, {
        foreignKey: 'profesorId',
        as: 'profesor'
      });
    }
  }

  CursoProfesor.init({
    cursoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cursos',
        key: 'id'
      }
    },
    profesorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profesores',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CursoProfesor',
    tableName: 'cursoprofesor',
  });

  return CursoProfesor;
};