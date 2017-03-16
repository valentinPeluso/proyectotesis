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
  app.get('/trello/members/:id/boards', [
    errorHandling.checkauth,
    trelloAPI.membersBoards,
    trello.membersBoards
  ]);
  app.post('/trello/boards', [
    errorHandling.checkauth,
    trelloAPI.createBoard,
    trello.createBoard
  ]);

  app.put('/trello/boards/:id/members', [
    errorHandling.checkauth,
    trelloAPI.addMemberToBoard,
    trello.addMemberToBoard
  ]);

  app.put('/trello/boards/:id/labelNames/blue', [
    errorHandling.checkauth,
    trelloAPI.addLabelBlue,
    trello.addLabelBlue
  ]);
  app.put('/trello/boards/:id/labelNames/green', [
    errorHandling.checkauth,
    trelloAPI.addLabelGreen,
    trello.addLabelGreen
  ]);
  app.put('/trello/boards/:id/labelNames/orange', [
    errorHandling.checkauth,
    trelloAPI.addLabelOrange,
    trello.addLabelOrange
  ]);
  app.put('/trello/boards/:id/labelNames/purple', [
    errorHandling.checkauth,
    trelloAPI.addLabelPurple,
    trello.addLabelPurple
  ]);
  app.put('/trello/boards/:id/labelNames/red', [
    errorHandling.checkauth,
    trelloAPI.addLabelRed,
    trello.addLabelRed
  ]);
  app.put('/trello/boards/:id/labelNames/yellow', [
    errorHandling.checkauth,
    trelloAPI.addLabelYellow,
    trello.addLabelYellow
  ]);
  app.post('/trello/boards/:id/lists', [
    errorHandling.checkauth,
    trelloAPI.addListToBoard,
    trello.addListToBoard
  ]);
  app.get('/trello/boards/:id/lists', [
    errorHandling.checkauth,
    trelloAPI.getListsFromBoard,
    trello.getListsFromBoard
  ]);
  app.get('/trello/boards/:id/members', [
    errorHandling.checkauth,
    trelloAPI.getMembersFromBoard,
    trello.getMembersFromBoard
  ]);
  app.post('/trello/lists/:id/cards', [
    errorHandling.checkauth,
    trelloAPI.createCard,
    trello.createCard
  ]);
  app.post('/trello/cards/:id/actions/comments', [
    errorHandling.checkauth,
    trelloAPI.createComent,
    trello.createComent
  ]);
  app.put('/trello/cards/:id', [
    errorHandling.checkauth,
    trelloAPI.updateCard,
    trello.updateCard
  ]);
  //-------- VIEW FILES ------
  app.get(/\/view\/?.*/, filesController.getFile);

};
