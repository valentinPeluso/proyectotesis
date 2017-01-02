(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('trelloService', trelloService);

    trelloService.$inject = ['$http', 'storageService'];

    function trelloService($http, storageService) {
        
        function membersMe() {
            return $http.get('/trello/members/me');
        }
        function addMemberToBoard(boardId, member) {
            return $http.put('/trello/boards/' + boardId + '/members', member);
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
            return $http.post('/trello/lists/'+ listId +'/cards', card);
        }
        function createComent(cardId, comment) {
            return $http.post('/trello/cards/'+ cardId +'/actions/comments', comment);
        }
        
        function updateCard(cardId, card) {
            return $http.put('/trello/cards/' + cardId , card);
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
        
        
        var service = {
            members: {
                me: membersMe,
                boards: membersBoards
            },
            lists: {
                createCard: createCard
            },
            boards: {
                create: createBoard,
                postInSession: boardPostInSession,
                getFromSession: boardGetFromSession,
                addMemberToBoard: addMemberToBoard,
                addListToBoard: addListToBoard,
                addLabelBlue: addLabelBlue,
                addLabelGreen: addLabelGreen,
                addLabelOrange: addLabelOrange,
                addLabelPurple: addLabelPurple,
                addLabelRed: addLabelRed,
                addLabelYellow: addLabelYellow,
                getLists: getLists
            },
            cards: {
                createComent: createComent,
                update: updateCard
            }
        };

        return service; 
    }

})();