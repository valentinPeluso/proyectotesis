var trelloAPI = {
  members: require('../controllers/trello/membersApiController'),
  boards: require('../controllers/trello/boardsApiController'),
  cards: require('../controllers/trello/cardsApiController'),
  lists: require('../controllers/trello/listsApiController'),
}
var trello = require('../controllers/trelloController');
var filesController = require('../controllers/filesController');
var errorHandling = require('../controllers/errorHandlingController');
var githubAPI = require("../controllers/github/githubApiController");

module.exports = function(app) {
  //--------GITHUB----------
  app.post('/github/authenticate', [
    githubAPI.authenticate
  ]);
  app.get('/github/get', [
    githubAPI.get
  ]);
  //--------TRELLO----------
  app.get('/trello/members/me', [
    errorHandling.checkauth,
    trelloAPI.members.me,
    trello.me
  ]);
  app.get('/trello/members/:id/boards', [
    errorHandling.checkauth,
    trelloAPI.members.membersBoards,
    trello.membersBoards
  ]);
  app.post('/trello/boards', [
    errorHandling.checkauth,
    trelloAPI.boards.createBoard,
    trello.createBoard
  ]);

  app.put('/trello/boards/:id/members', [
    errorHandling.checkauth,
    trelloAPI.boards.addMemberToBoard,
    trello.addMemberToBoard
  ]);

  app.put('/trello/boards/:id/labelNames/blue', [
    errorHandling.checkauth,
    trelloAPI.boards.addLabelBlue,
    trello.addLabelBlue
  ]);
  app.put('/trello/boards/:id/labelNames/green', [
    errorHandling.checkauth,
    trelloAPI.boards.addLabelGreen,
    trello.addLabelGreen
  ]);
  app.put('/trello/boards/:id/labelNames/orange', [
    errorHandling.checkauth,
    trelloAPI.boards.addLabelOrange,
    trello.addLabelOrange
  ]);
  app.put('/trello/boards/:id/labelNames/purple', [
    errorHandling.checkauth,
    trelloAPI.boards.addLabelPurple,
    trello.addLabelPurple
  ]);
  app.put('/trello/boards/:id/labelNames/red', [
    errorHandling.checkauth,
    trelloAPI.boards.addLabelRed,
    trello.addLabelRed
  ]);
  app.put('/trello/boards/:id/labelNames/yellow', [
    errorHandling.checkauth,
    trelloAPI.boards.addLabelYellow,
    trello.addLabelYellow
  ]);
  app.post('/trello/boards/:id/lists', [
    errorHandling.checkauth,
    trelloAPI.boards.addListToBoard,
    trello.addListToBoard
  ]);
  app.get('/trello/boards/:id/lists', [
    errorHandling.checkauth,
    trelloAPI.boards.getListsFromBoard,
    trello.getListsFromBoard
  ]);
  app.get('/trello/boards/:id/members', [
    errorHandling.checkauth,
    trelloAPI.boards.getMembersFromBoard,
    trello.getMembersFromBoard
  ]);
  app.get('/trello/boards/:id/labels', [
    errorHandling.checkauth,
    trelloAPI.boards.getLabelsFromBoard,
    trello.getLabelsFromBoard
  ]);
  app.get('/trello/boards/:id/cards', [
    errorHandling.checkauth,
    trelloAPI.boards.getCardsFromBoard,
    trello.getCardsFromBoard
  ]);
  app.get('/trello/lists/:id', [
    errorHandling.checkauth,
    trelloAPI.lists.getListById,
    trello.getListById
  ]);
  app.get('/trello/cards/:id', [
    errorHandling.checkauth,
    trelloAPI.cards.getCardById,
    trello.getCardById
  ]);
  app.get('/trello/cards/:id/attachments', [
    errorHandling.checkauth,
    trelloAPI.cards.getCardAttachments,
    trello.getCardAttachments
  ]);
  app.post('/trello/lists/:id/cards', [
    errorHandling.checkauth,
    trelloAPI.lists.createCard,
    trello.createCard
  ]);
  app.post('/trello/cards/:id/actions/comments', [
    errorHandling.checkauth,
    trelloAPI.cards.createComent,
    trello.createComent
  ]);
  app.put('/trello/cards/:id', [
    errorHandling.checkauth,
    trelloAPI.cards.updateCard,
    trello.updateCard
  ]);
  app.put('/trello/cards/:idCard/idList', [
    errorHandling.checkauth,
    trelloAPI.cards.moveCard,
    trello.moveCard
  ]);
  app.post('/trello/cards/:idCard/idLabels', [
    errorHandling.checkauth,
    trelloAPI.cards.assigneeState,
    trello.assigneeState
  ]);
  app.post('/trello/cards/:idCard/attachments', [
    errorHandling.checkauth,
    trelloAPI.cards.addAttachment,
    trello.addAttachment
  ]);
  app.del('/trello/cards/:idCard/idLabels/:idLabel', [
    errorHandling.checkauth,
    trelloAPI.cards.removeState,
    trello.removeState
  ]);
  //-------- VIEW FILES ------
  app.get(/\/view\/?.*/, filesController.getFile);

};
