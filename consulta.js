const models = require('./models');

async function consulta() {
    const estudiantes = await models.Estudiante.findAll();
    estudiantes.forEach(estudiante => {
        console.log(estudiante.dataValues);
    });

    const cursos = await models.Curso.findAll();
    cursos.forEach(curso => {
        console.log(curso.dataValues);
    });

    const profesores = await models.Profesor.findAll();
    profesores.forEach(profesor => {
        console.log(profesor.dataValues);
    });

    models.sequelize.close();
}

consulta();