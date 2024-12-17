'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
// models/curso.js
static associate(models) {
  // Relación muchos a muchos con Profesor
  this.belongsToMany(models.Profesor, {
    through: models.CursoProfesor,
    foreignKey: 'cursoId',
    as: 'profesores'
  });

  // Relación muchos a muchos con Estudiante
  this.belongsToMany(models.Estudiante, {
    through: models.CursoEstudiante,
    foreignKey: 'cursoId',
    as: 'estudiantes'
  });
}
  }
  Curso.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};