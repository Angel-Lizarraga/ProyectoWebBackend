'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Curso, {
        through: models.CursoProfesor,
        foreignKey: 'profesorId',
        as: 'cursos'
      });
    }
  }
  Profesor.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matEmpleado: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Profesor',
    tableName: 'profesores',
  });
  return Profesor;
};