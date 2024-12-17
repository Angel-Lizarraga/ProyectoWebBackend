'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacion con tabla de cursiestudiante
      this.belongsToMany(models.Curso, {
      through: models.CursoEstudiante,
      foreignKey: 'estudianteId',
      as: 'cursos'
      });
      this.hasMany(models.CursoEstudiante, {
        foreignKey: 'estudianteId',
        as: 'cursoEstudiantes'
      });
    }
  }
  Estudiante.init({
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semestre:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditos:{
      type: DataTypes.INTEGER,
      allowNull: false,
  },
}, {
    sequelize,
    modelName: 'Estudiante',
  });
  return Estudiante;
};