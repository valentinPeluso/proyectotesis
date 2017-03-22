(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('trelloService', trelloService);

    trelloService.$inject = ['$http', 'storageService'];

    function trelloService($http, storageService) {

        var service = {
            members: {
                me: membersMe,
                boards: membersBoards
            },
            lists: {
                createCard: createCard,
                getList: getListById
            },
            boards: {
                create: createBoard,
                postInSession: boardPostInSession,
                getFromSession: boardGetFromSession,
                getMembers: boardGetMembers,
                addMemberToBoard: addMemberToBoard,
                addListToBoard: addListToBoard,
                addLabelBlue: addLabelBlue,
                addLabelGreen: addLabelGreen,
                addLabelOrange: addLabelOrange,
                addLabelPurple: addLabelPurple,
                addLabelRed: addLabelRed,
                addLabelYellow: addLabelYellow,
                getLists: getLists,
                getCards: getCards
            },
            cards: {
                createComent: createComent,
                update: updateCard,
                getCard: getCardById,
                moveCard: moveCard
            }
        };

        function moveCard(idCard, value) {
            return $http.put('/trello/cards/' + idCard + '/idList', value);
        }

        function getCardById(idCard) {
            return $http.get('/trello/cards/' + idCard);
        }

        function getListById(idList) {
            return $http.get('/trello/lists/' + idList);
        }

        function membersMe() {
            return $http.get('/trello/members/me');
        }

        function addMemberToBoard(boardId, member) {
            return $http.put('/trello/boards/' + boardId + '/members', member);
        }

        function boardGetMembers(boardId) {
            return $http.get('/trello/boards/' + boardId + '/members');
        }

        function addLabelBlue(boardId, label) {
            return $http.put('/trello/boards/' + boardId + '/labelNames/blue', label);
        }

        function addLabelGreen(boardId, label) {
            return $http.put('/trello/boards/' + boardId + '/labelNames/green', label);
        }

        function addLabelOrange(boardId, label) {
            return $http.put('/trello/boards/' + boardId + '/labelNames/orange', label);
        }

        function addLabelPurple(boardId, label) {
            return $http.put('/trello/boards/' + boardId + '/labelNames/purple', label);
        }

        function addLabelRed(boardId, label) {
            return $http.put('/trello/boards/' + boardId + '/labelNames/red', label);
        }

        function addLabelYellow(boardId, label) {
            return $http.put('/trello/boards/' + boardId + '/labelNames/yellow', label);
        }

        function addListToBoard(boardId, list) {
            return $http.post('/trello/boards/' + boardId + '/lists', list);
        }

        function getCards(boardId) {
            return $http.get('/trello/boards/' + boardId + '/cards');
        }

        function getLists(boardId) {
            return $http.get('/trello/boards/' + boardId + '/lists');
        }

        function membersBoards() {
            return $http.get('/trello/members/' + getUserLoggedId() + '/boards');
        }

        function getUserLoggedId() {
            var cookie = {
                id: 'TrelloUserLogged'
            }
            var userLogged = storageService.session.get(cookie);
            return userLogged.id;
        }

        function createBoard(board) {
            return $http.post('/trello/boards', board);
        }

        function createCard(listId, card) {
            return $http.post('/trello/lists/' + listId + '/cards', card);
        }

        function createComent(cardId, comment) {
            return $http.post('/trello/cards/' + cardId + '/actions/comments', comment);
        }

        function updateCard(cardId, card) {
            return $http.put('/trello/cards/' + cardId, card);
        }

        function boardPostInSession(board) {
            var session = {
                id: 'BoardSelected',
                data: board
            }
            storageService.session.put(session);
        }

        function boardGetFromSession() {
            var session = {
                id: 'BoardSelected'
            }
            return storageService.session.get(session);
        }

        return service;
    }

})();
