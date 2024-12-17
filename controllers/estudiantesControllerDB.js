const { Estudiante, Curso, Profesor } = require('../models');

// Obtener todos los estudiantes
const getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll({
            include: [{ model: Curso, as: 'cursos' }],
        });
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un estudiante por matrícula
const getEstudianteByMatricula = async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const estudiante = await Estudiante.findOne({
            where: { matricula },
            include: [{ model: Curso, as: 'cursos' }],
        });
        if (estudiante) {
            res.status(200).json(estudiante);
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo estudiante
const createEstudiante = async (req, res) => {
    try {
        const { matricula, nombre, semestre, creditos } = req.body;
        const nuevoEstudiante = await Estudiante.create({ matricula, nombre, semestre, creditos });
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un estudiante por matrícula
const updateEstudiante = async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const { nombre, semestre, creditos } = req.body;
        const [updated] = await Estudiante.update(
            { nombre, semestre, creditos },
            { where: { matricula } }
        );
        if (updated) {
            const updatedEstudiante = await Estudiante.findOne({ where: { matricula } });
            res.status(200).json(updatedEstudiante);
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un estudiante por matrícula
const deleteEstudiante = async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const deleted = await Estudiante.destroy({ where: { matricula } });
        if (deleted) {
            res.status(200).json({ message: `Estudiante con matrícula ${matricula} eliminado correctamente` });
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Inscribir un estudiante a un curso por matrícula
const enrollEstudiante = async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const clave = req.body.clave;

        const estudiante = await Estudiante.findOne({ where: { matricula } });
        if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });

        const curso = await Curso.findOne({ where: { clave } });
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });


        const alreadyEnrolled = await estudiante.hasCurso(curso);
        if (alreadyEnrolled) {
            return res.status(400).json({ error: 'El estudiante ya está inscrito en este curso' });
        }

        // "Inscribe" al estudiante AL CURSO
        await estudiante.addCurso(curso);
        res.status(200).json({ message: 'Estudiante inscrito al curso exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Desinscribir un estudiante de un curso por matrícula
const disenrollEstudiante = async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const clave = req.body.clave; 

        const estudiante = await Estudiante.findOne({ where: { matricula } });
        if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });

        const curso = await Curso.findOne({ where: { clave } });
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });

        const isEnrolled = await estudiante.hasCurso(curso);
        if (!isEnrolled) {
            return res.status(400).json({ error: 'El estudiante no está inscrito en este curso' });
        }

        await estudiante.removeCurso(curso);
        res.status(200).json({ message: 'Estudiante desinscrito del curso exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener los cursos inscritos por un estudiante
const cursosInscritosEstudiantes = async (req, res) => {
    try {
        const { matricula } = req.params;

        const estudiante = await Estudiante.findOne({
            where: { matricula },
            include: [{ model: Curso, as: 'cursos' }] 
        });

        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json(estudiante.cursos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los cursos del estudiante' });
    }
};

// Obtener los profesores de los cursos de un estudiante
const getProfesoresEstudiantes = async (req, res) => {
    try {
        const { matricula } = req.params;
        const estudiante = await Estudiante.findOne({
            where: { matricula },
            include: [{
                model: Curso,
                as: 'cursos',
                include: [{
                    model: Profesor,
                    as: 'profesores',
                    through: { attributes: [] }
                }]
            }]
        });
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        const profesoresConCursos = estudiante.cursos.flatMap(curso =>
            curso.profesores.map(profesor => ({
                profesor: {
                    id: profesor.id,
                    nombre: profesor.nombre,
                    matEmpleado: profesor.matEmpleado
                },
                curso: {
                    clave: curso.clave,
                    nombre: curso.nombre
                }
            }))
        );
        res.status(200).json(profesoresConCursos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los profesores del estudiante' });
    }
};

module.exports = {
    getAllEstudiantes,
    getEstudianteByMatricula,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
    enrollEstudiante,
    disenrollEstudiante,
    cursosInscritosEstudiantes,
    getProfesoresEstudiantes,
};
