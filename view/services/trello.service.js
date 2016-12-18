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
                addLabelYellow: addLabelYellow
            }
        };

        return service; 
    }

})();