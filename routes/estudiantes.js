const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesControllerDB');

router.get('/estudiantes', estudiantesController.getAllEstudiantes);
router.get('/estudiantes/:matricula', estudiantesController.getEstudianteByMatricula);
router.post('/estudiantes', estudiantesController.createEstudiante);
router.put('/estudiantes/:matricula', estudiantesController.updateEstudiante);
router.delete('/estudiantes/:matricula', estudiantesController.deleteEstudiante);

router.patch('/estudiantes/:matricula/inscribir', estudiantesController.enrollEstudiante);
router.patch('/estudiantes/:matricula/desinscribir', estudiantesController.disenrollEstudiante);

router.get('/estudiantes/:matricula/cursos', estudiantesController.cursosInscritosEstudiantes); 
router.get('/estudiantes/:matricula/profesores', estudiantesController.getProfesoresEstudiantes);

module.exports = router;
