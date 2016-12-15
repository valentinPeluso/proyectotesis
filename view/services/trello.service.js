(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('trelloService', trelloService);

    trelloService.$inject = ['$http'];

    function trelloService($http) {
        var service = {
            members: {
                me: membersMe
            }
        };

        return service;   

        function membersMe() {
            return $http.get('/trello/members/me');
        }
    }

})();