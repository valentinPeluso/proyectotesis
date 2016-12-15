var saludador = require('../controllers/saludadorController');
var restify = require('restify');
var trelloAPI = require('../controllers/trelloApiController');
var trello = require('../controllers/trelloController');
var filesController = require('../controllers/filesController');
var errorHandling = require('../controllers/errorHandlingController');

module.exports = function(app) {
  app.get('/saludo', saludador.saludo);
  app.get('/despedida', saludador.despedida);
  //--------TRELLO----------
  app.get('/trello/members/me', [
    errorHandling.checkauth, 
    trelloAPI.me, 
    trello.me
  ]);
  app.get('/trello/boards/:id/lists', [
    errorHandling.checkauth,
    trelloAPI.getBoardLists,
    trello.getBoardLists
  ]);
  //-------- VIEW FILES ------
  app.get(/\/view\/?.*/, filesController.getFile);
  
};
