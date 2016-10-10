var saludador = require('../models/saludador');

function saludo (req, res) {
  var nombre = req.query.nombre;
  res.send('<h1>Hola ' + saludador.saludar(nombre) + '</h1>');
}

function despedida (req, res) {
  var nombre = req.query.nombre;
  res.send('<h1>Chau ' + saludador.saludar(nombre) + '</h1>');
}

module.exports = {
  saludo: saludo,
  despedida: despedida
};
