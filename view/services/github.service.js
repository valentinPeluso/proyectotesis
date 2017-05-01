(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('githubService', githubService);

    githubService.$inject = ['$http', 'storageService', '$location'];

    function githubService($http, storageService, $location) {
        var service = {
            users: {
                authenticate: authenticate,
                postInSession: postUserInSession,
                getFromSession: getUserFromSession
            },
            repos: {
                getFromSession: getRepoFromSession,
                postInSession: postRepoInSession,
                getRepos: getRepos,
                getPullRequest: getPullRequest
            }
        }

        function getRepoFromSession() {
            var session = {
                id: 'RepositrySelected'
            };
            return storageService.session.get(session);
        }

        function postRepoInSession(repository) {
            var session = {
                id: 'RepositrySelected',
                data: repository
            };
            storageService.session.put(session);
        }

        function getPullRequest() {
            return $http.get('/github/repos/get');
        }

        function getRepos() {
            // var githubUser = getUserFromSession();
            // if (githubUser !== null) {
            //     return $http.get(githubUser.repos_url);
            // }
            // else {
            //     $location.path('/login');
            // }
            return $http.get('/github/get?url=https://api.github.com/users/valentinPeluso/repos');
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

        function getUserFromSession() {
            var session = {
                id: 'GitHubUser'
            }
            return storageService.session.get(session);
        }

        return service;
    }
})();
