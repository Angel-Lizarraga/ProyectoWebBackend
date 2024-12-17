let profesores = [
    { id: '1', nombre: 'Dr. John Smith', matEmpleado: '0741', cursos: [] },
    { id: '2', nombre: 'Dra. Lisa Brown', matEmpleado: '0731', cursos: [] },
    { id: '3', nombre: 'Dr. Miguel Gomez', matEmpleado: '0721', cursos: [] },
];

const findAll = function() {
    return profesores;
};

const findById = function(id) {
    return profesores.find((e) => e.id == id);
};

const findByMatEmpleado = function(matEmpleado) {
    return profesores.find((e) => e.matEmpleado == matEmpleado);
};

const add = function(profesor) {
    profesores.push(profesor);
    return profesor;
};

const save = function(id, profesor) {
    const index = profesores.findIndex((e) => e.id == id);
    if (index !== -1) {
        profesores[index] = { ...profesores[index], ...profesor };
        return profesores[index];
    }
    return null;
};

const erase = function(id) {
    const registro = profesores.find((e) => e.id == id);
    if (registro) {
        profesores.splice(profesores.indexOf(registro), 1);
        return true;
    }
    return false;
};

const update = function(id, data) {
    const index = profesores.findIndex((e) => e.id == id);
    if (index !== -1) {
        profesores[index] = { ...profesores[index], ...data };
        return profesores[index];
    }
    return null;
};

exports.findById = findById;
exports.findByMatEmpleado = findByMatEmpleado;
exports.findAll = findAll;
exports.add = add;
exports.save = save;
exports.update = update;
exports.erase = erase;

