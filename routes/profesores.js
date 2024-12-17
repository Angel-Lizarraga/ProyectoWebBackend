const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresControllerDB');

router.use(express.json());

router.get('/profesores', profesoresController.getAllProfesores);
router.get('/profesores/:matEmpleado', profesoresController.getProfesorByMatricula);
router.post('/profesores', profesoresController.createProfesor);
router.put('/profesores/:matEmpleado', profesoresController.updateProfesor);
router.delete('/profesores/:matEmpleado', profesoresController.deleteProfesor);

router.patch('/profesores/:matEmpleado/inscribir', profesoresController.enrollProfesor);
router.patch('/profesores/:matEmpleado/desinscribir', profesoresController.disenrollProfesor);

router.get('/profesores/:matEmpleado/cursos', profesoresController.cursosInscritosProfesor);

router.get('/profesores/:matEmpleado/estudiantes', profesoresController.getEstudiantesProfesor);

module.exports = router;