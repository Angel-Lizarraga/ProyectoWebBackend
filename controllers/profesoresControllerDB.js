const { Profesor, Curso, Estudiante, CursoEstudiante, CursoProfesor } = require('../models');


// Obtener todos los profesores
async function getAllProfesores(req, res) {
  try {
    const profesores = await Profesor.findAll();
    res.status(200).json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor al obtener los profesores' });
  }
}

// Obtener un profesor por su matrícula
async function getProfesorByMatricula(req, res) {
  try {
    const { matEmpleado } = req.params;

    const profesor = await Profesor.findOne({ where: { matEmpleado } });

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.status(200).json(profesor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor al obtener el profesor' });
  }
}

// Crear un nuevo profesor
async function createProfesor(req, res) {
  try {
    const { nombre, matEmpleado } = req.body;
    const nuevoProfesor = await Profesor.create({
      nombre,
      matEmpleado
    });
    res.status(201).json(nuevoProfesor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor al crear el profesor' });
  }
}

// Actualizar un profesor por su matrícula
async function updateProfesor(req, res) {
  try {
    const { matEmpleado } = req.params;
    const { nombre } = req.body;

    const profesor = await Profesor.findOne({ where: { matEmpleado } });

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    profesor.nombre = nombre || profesor.nombre;
    await profesor.save();

    res.status(200).json(profesor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor al actualizar el profesor' });
  }
}

// Eliminar un profesor por su matrícula
async function deleteProfesor(req, res) {
  try {
    const { matEmpleado } = req.params;

    const profesor = await Profesor.findOne({ where: { matEmpleado } });

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    await profesor.destroy();
    res.status(200).json({ msg: `Profesor con matrícula ${matEmpleado} eliminado exitosamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor al eliminar el profesor' });
  }
}

// Inscribir a un profesor en un curso
const enrollProfesor = async (req, res) => {
  try {
      const { matEmpleado } = req.params;
      const { clave } = req.body;

      const profesor = await Profesor.findOne({ where: { matEmpleado } });
      if (!profesor) {
          return res.status(404).json({ error: 'Profesor no encontrado' });
      }

      const curso = await Curso.findOne({ where: { clave } });
      if (!curso) {
          return res.status(404).json({ error: 'Curso no encontrado' });
      }

      const cursoProfesor = await CursoProfesor.findOne({
        where: {
          profesorId: profesor.id,
          cursoId: curso.id
        }
      });
      if (cursoProfesor) {
        return res.status(400).json({ error: 'El profesor ya está inscrito en este curso' });
      }
      await CursoProfesor.create({
        profesorId: profesor.id,
        cursoId: curso.id
      });

      return res.status(200).json({ message: 'Profesor inscrito al curso' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al inscribir al profesor' });
  }
};


// Desinscribir a un profesor de un curso
const disenrollProfesor = async (req, res) => {
  try {
      const { matEmpleado } = req.params;
      const { clave } = req.body;

      // Busca el profesor por su matrícula
      const profesor = await Profesor.findOne({ where: { matEmpleado } });
      if (!profesor) {
          return res.status(404).json({ error: 'Profesor no encontrado' });
      }

      // Busca el curso por su clave
      const curso = await Curso.findOne({ where: { clave } });
      if (!curso) {
          return res.status(404).json({ error: 'Curso no encontrado' });
      }

      // Busca la relación entre el profesor y el curso
      const cursoProfesor = await CursoProfesor.findOne({
        where: {
          profesorId: profesor.id,
          cursoId: curso.id
        }
      });
      if (!cursoProfesor) {
          return res.status(400).json({ error: 'El profesor no está inscrito en este curso' });
      }

      // Elimina la relación en la tabla intermedia
      await cursoProfesor.destroy();

      return res.status(200).json({ message: 'Profesor desinscrito del curso' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al desinscribir al profesor' });
  }
};

// Obtener todos los cursos en los que un profesor está inscrito
async function cursosInscritosProfesor(req, res) {
  try {
    const { matEmpleado } = req.params;

    // Busca al profesor e incluye los cursos relacionados
    const profesor = await Profesor.findOne({
      where: { matEmpleado },
      include: { model: Curso, as: 'cursos' }
    });

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.status(200).json(profesor.cursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los cursos del profesor' });
  }
}

// Obtener todos los estudiantes inscritos en los cursos de un profesor, incluyendo el curso al que pertenecen
async function getEstudiantesProfesor(req, res) {
  try {
    const { matEmpleado } = req.params;

    // Busca al profesor y sus cursos junto con los estudiantes
    const profesor = await Profesor.findOne({
      where: { matEmpleado },
      include: {
        model: Curso,
        as: 'cursos',
        include: {
          model: Estudiante,
          as: 'estudiantes',
          through: { attributes: [] }
        }
      }
    });

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    const estudiantesConCursos = profesor.cursos.flatMap(curso =>
      curso.estudiantes.map(estudiante => ({
        estudiante: {
          matricula: estudiante.matricula,
          nombre: estudiante.nombre
        },
        curso: {
          clave: curso.clave,
          nombre: curso.nombre
        }
      }))
    );

    res.status(200).json(estudiantesConCursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los estudiantes del profesor' });
  }
}

module.exports = {
  getAllProfesores,
  getProfesorByMatricula,
  createProfesor,
  updateProfesor,
  deleteProfesor,
  enrollProfesor,
  disenrollProfesor,
  cursosInscritosProfesor,
  getEstudiantesProfesor
};