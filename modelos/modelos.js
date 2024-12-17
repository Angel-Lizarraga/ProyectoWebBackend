const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, './');
const modelos = {};

fs.readdirSync(modelsDir).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const controlerName = file.replace('.js', '');
    modelos[controlerName] = require(path.join(modelsDir, file));
  }
});

module.exports = modelos;