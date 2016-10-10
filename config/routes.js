var saludador = require('../controllers/saludadorController');
var trelloAPI = require('../controllers/trelloApiController');
var trello = require('../controllers/trelloController');

module.exports = function(app) {
  app.get('/saludo', saludador.saludo);
  app.get('/despedida', saludador.despedida);
  app.get('/trello/me', [trelloAPI.me, trello.me]);
};
