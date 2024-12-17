const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, './');
const controllers = {};

fs.readdirSync(controllersDir).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const controlerName = file.replace('.js', '');
    controllers[controlerName] = require(path.join(controllersDir, file));
  }
});

module.exports = controllers;