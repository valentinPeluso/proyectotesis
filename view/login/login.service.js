(function () {
    'use strict';

    angular
        .module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['$http'];

    function loginService($http) {
        var service = {
            loginWithTrello: loginWithTrello,
            loginWithGithub: loginWithGithub
        };

        return service;   

        function loginWithGithub() {
           
        }
        function loginWithTrello() {
            return $http.get('https://trello.com/1/authorize');
        }
    }

})();