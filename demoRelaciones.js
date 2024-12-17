const { Curso, Estudiante } = require('./models'); // Ajusta la ruta si es necesario

async function obtenerDatos() {
  try {
    // Estudiantes de un curso
    const curso = await Curso.findByPk(1, {
      include: { model: Estudiante, as: 'estudiantes' },
    });

    if (curso) {
      console.log(`Estudiantes del curso: ${curso.nombre}`);
      curso.estudiantes.forEach((estudiante) => {
        console.log(`- ${estudiante.nombre} (${estudiante.matricula})`);
      });
    } else {
      console.log('No se encontró el curso con ID 1.');
    }

    // Cursos de un estudiante
    const estudiante = await Estudiante.findByPk(1, {
      include: { model: Curso, as: 'cursos' },
    });

    if (estudiante) {
      console.log(`\nCursos de ${estudiante.nombre}:`);
      estudiante.cursos.forEach((curso) => {
        console.log(`- ${curso.nombre} (${curso.clave})`);
      });
    } else {
      console.log('No se encontró el estudiante con ID 1.');
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

obtenerDatos();
