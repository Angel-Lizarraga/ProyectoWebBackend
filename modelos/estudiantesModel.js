let estudiantes = [
    { id: 1, matricula: '12345', nombre: 'Juan Perez', semestre: '2022-1', creditos: 30, cursos: [] },
    { id: 2, matricula: '54321', nombre: 'Maria Gomez', semestre: '2022-2', creditos: 25, cursos: [] },
    { id: 3, matricula: '67890', nombre: 'Luis Martinez', semestre: '2022-1', creditos: 35, cursos: [] },
];

const findAll = function() {
    return estudiantes;
};

const findById = function(id) {
    return estudiantes.find(e => e.id == id);
};

const findByMatricula = function(matricula) {
    return estudiantes.find(e => e.matricula == matricula);
};

const add = function(estudiante) {
    estudiantes.push(estudiante);
    return estudiante;
};

const save = function(id, data) {
    const index = estudiantes.findIndex(e => e.id == id);
    if (index !== -1) {
        estudiantes[index] = { ...estudiantes[index], ...data };
        return estudiantes[index];
    }
    return null;
};

const erase = function(id) {
    const registro = estudiantes.find(e => e.id == id);
    if (registro) {
        estudiantes.splice(estudiantes.indexOf(registro), 1);
        return true;
    }
    return false;
};

const update = function(id, data) {
    const index = estudiantes.findIndex(e => e.id == id);
    if (index !== -1) {
        estudiantes[index] = { ...estudiantes[index], ...data };
        return estudiantes[index];
    }
    return null;
};

exports.findAll = findAll;
exports.findById = findById;
exports.findByMatricula = findByMatricula;
exports.add = add;
exports.save = save;
exports.update = update;
exports.erase = erase;