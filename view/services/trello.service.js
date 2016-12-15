(function () {
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
            }
        };

        return service;   

        function membersMe() {
            return $http.get('/trello/members/me');
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
    }

})();