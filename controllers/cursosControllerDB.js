const { Profesor, Curso, Estudiante, CursoEstudiante, CursoProfesor } = require('../models');

// Obtener todos los cursos
const getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos', details: error.message });
  }
};

// Obtener un curso por su clave
const getCursos = async (req, res) => {
  const clave = req.params.clave;
  try {
    const curso = await Curso.findOne({
      where: { clave }
    });
    if (curso) {
      res.status(200).json(curso); 
    } else {
      res.status(404).json({ error: 'Curso con clave no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso', details: error.message });
  }
};

// Crear un nuevo curso
const createCursos = async (req, res) => {
  const { nombre, clave, creditos, matEmpleado } = req.body;
  try {
    const nuevoCurso = await Curso.create({
      nombre,
      clave,
      creditos,
    });
    if (matEmpleado) {
      const profesor = await Profesor.findOne({ where: { matEmpleado } });
      if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
      }
      await nuevoCurso.addProfesor(profesor);
    }

    res.status(201).json(nuevoCurso);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el curso', details: error.message });
  }
};

const updateCursos = async (req, res) => {
  const clave = req.params.clave;
  const { nombre, creditos, matEmpleado } = req.body;
  try {
    const curso = await Curso.findOne({
      where: { clave }
    });

    if (curso) {
      const updatedCurso = await curso.update({
        nombre,
        creditos,
      });
      if (matEmpleado) {
        const profesor = await Profesor.findOne({ where: { matEmpleado } });
        if (!profesor) {
          return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        await updatedCurso.setProfesor(profesor);
      }

      res.status(200).json(updatedCurso);
    } else {
      res.status(404).json({ error: 'Curso con clave no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso', details: error.message });
  }
};

// Eliminar un curso por su clave
const deleteCursos = async (req, res) => {
  const clave = req.params.clave;
  try {
    const curso = await Curso.findOne({
      where: { clave }
    });
    if (curso) {
      await curso.destroy();
      res.status(200).json({ msg: `Curso con clave: ${clave} eliminado exitosamente` });
    } else {
      res.status(404).json({ error: 'Curso con clave no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el curso', details: error.message });
  }
};

// Obtener los profesores de un curso
const getProfesoresCurso = async (req, res) => {
  try {
      const { clave } = req.params;
      const curso = await Curso.findOne({
          where: { clave },
          include: [{
              model: Profesor,
              as: 'profesores',
              through: { attributes: [] }
          }]
      });

      if (!curso) {
          return res.status(404).json({ error: 'Curso no encontrado' });
      }

      // Devuelve los profesores asociados
      res.status(200).json(curso.profesores);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los profesores del curso' });
  }
};

// Obtener los estudiantes de un curso
const getEstudiantesCurso = async (req, res) => {
  try {
      const { clave } = req.params;
      const curso = await Curso.findOne({
          where: { clave },
          include: [{
              model: Estudiante,
              as: 'estudiantes',
              through: { attributes: [] }
          }]
      });

      if (!curso) {
          return res.status(404).json({ error: 'Curso no encontrado' });
      }
      res.status(200).json(curso.estudiantes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los estudiantes del curso' });
  }
};
exports.getAllCursos = getAllCursos;
exports.getCursos = getCursos;
exports.createCursos = createCursos;
exports.updateCursos = updateCursos;
exports.deleteCursos = deleteCursos;
exports.getProfesoresCurso = getProfesoresCurso;
exports.getEstudiantesCurso = getEstudiantesCurso;