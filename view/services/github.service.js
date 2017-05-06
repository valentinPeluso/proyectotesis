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
                getPullRequests: getPullRequests,
                commentPullRequestBody: commentPullRequestBody
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

        function getPullRequests() {
            var githubUser = getUserFromSession();
            var githubRepo = getRepoFromSession();
            var url = '/github/' + githubUser.username + '/' + githubUser.password;
            return $http.get(url + '/repos/' + githubUser.user.login + '/' + githubRepo.name + '/pulls');
        }

        function commentPullRequestBody(number, body) {
            var githubUser = getUserFromSession();
            var githubRepo = getRepoFromSession();
            var url = '/github/' + githubUser.username + '/' + githubUser.password;
            return $http.put(url + '/repos/' + githubUser.user.login + '/' + githubRepo.name + '/pulls/' + number, body);
        }

        function getRepos() {
            var githubUser = getUserFromSession();
            var url = '/github/' + githubUser.username + '/' + githubUser.password;
            return $http.get(url + '/repos/get');
        }

        function authenticate(username, password) {
            return $http.post(
                "/github/authenticate", {
                    username: username,
                    password: password
                }
            );
        }

        function postUserInSession(user, username, password) {
            var session = {
                id: 'GitHubUser',
                data: {
                    user: user,
                    username: username,
                    password: password
                }
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
