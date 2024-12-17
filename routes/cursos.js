const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosControllerDB');

router.use(express.json());

router.get('/cursos', cursosController.getAllCursos);
router.get('/cursos/:clave', cursosController.getCursos);
router.post('/cursos', cursosController.createCursos);
router.put('/cursos/:clave', cursosController.updateCursos);
router.delete('/cursos/:clave', cursosController.deleteCursos);

router.get('/cursos/:clave/profesores', cursosController.getProfesoresCurso);
router.get('/cursos/:clave/estudiantes', cursosController.getEstudiantesCurso);

module.exports = router;