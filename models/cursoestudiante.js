'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CursoEstudiante extends Model {
    static associate(models) {
      // Un Curso tiene muchos Estudiantes a través de CursoEstudiante
      this.belongsTo(models.Curso, {
        foreignKey: 'cursoId',
        as: 'curso'  // Alias para la relación
      });
      // Un Estudiante tiene muchos Cursos a través de CursoEstudiante
      this.belongsTo(models.Estudiante, {
        foreignKey: 'estudianteId',
        as: 'estudiante'
      });
    }
  }
  CursoEstudiante.init({
    cursoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cursos',
        key: 'id'
      }
    },
    estudianteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Estudiantes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CursoEstudiante',
  });
  return CursoEstudiante;
};