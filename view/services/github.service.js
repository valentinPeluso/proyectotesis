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
                postInSession: postUserInSession
            },
            repos: {
                get: getRepos,
                postInSession: postRepoInSession
            }
        }

        function postRepoInSession(repository) {
            var session = {
                id: 'RepositrySelected',
                data: repository
            }
            storageService.session.put(session);
        }

        function getRepos() {
            return $http.get('/github/repos/get');
        }

        function authenticate(username, password) {
            return $http.post(
                "/github/authenticate", {
                    username: username,
                    password: password
                }
            );
        }

        function postUserInSession(user) {
            var session = {
                id: 'GitHubUser',
                data: user
            }
            storageService.session.put(session);
        }

        return service;
    }
})();
