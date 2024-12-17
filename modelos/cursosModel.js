let cursos = [
    { id: '1', nombre: 'Matemáticas Avanzadas', clave: '1111', creditos: 6, profeID: null },
    { id: '2', nombre: 'Introducción a la Física', clave: '2222', creditos: 4, profeID: null },
    { id: '3', nombre: 'Historia Mundial', clave: '3333', creditos: 3, profeID: null }
];


const findById = function (id) {
    return cursos.find((e) => e.id == id);
};

const findAll = function () {
    return cursos;
};

const add = function (curso) {
    cursos.push(curso);
    return curso;
};

const save = function (id, curso) {
    const index = cursos.findIndex((e) => e.id == id);
    if (index !== -1) {
        cursos[index] = { ...cursos[index], ...curso };
        return cursos[index];
    }
    return null;
};

const update = function (id, data) {
    const index = cursos.findIndex((e) => e.id == id);
    if (index !== -1) {
        cursos[index] = { ...cursos[index], ...data };
        return cursos[index];
    }
    return null;
};

const erase = function (id) {
    const index = cursos.findIndex((e) => e.id == id);
    if (index !== -1) {
        cursos.splice(index, 1);
        return true;
    }
    return false;
};

exports.findById = findById;
exports.findAll = findAll;
exports.add = add;
exports.save = save;
exports.update = update;
exports.erase = erase;

