(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('githubService', githubService);

    githubService.$inject = ['$http', 'storageService'];

    function githubService($http, storageService) {
        var service = {
            users: {
                authenticate: authenticate,
                postInSession: postInSession
            }
        }

        function authenticate(username, password) {
            return $http.post(
                "/github/authenticate", {
                    username: username,
                    password: password
                }
            );
        }

        function postInSession(user) {
            var session = {
                id: 'GitHubUser',
                data: user
            }
            storageService.session.put(session);
        }

        return service;
    }
})();
