(function() {
    'use strict';

    /* global _ */
    /* global angular */
    /* global $ */
    /* global Trello */

    angular.module('app')
        .run(run)

    run.$inject = [
        'editableOptions',
        '$rootScope',
        'sessionService',
        '$location',
        'storageService',
        'trelloService',
        '$route',
        '$http',
        '$window',
        'githubService',
        'jsonFormatterService',
        '$q'
    ];

    function run(
        editableOptions,
        $rootScope,
        sessionService,
        $location,
        storageService,
        trelloService,
        $route,
        $http,
        $window,
        githubService,
        jsonFormatterService,
        $q
    ) {
        // ANGULAR-XEDITABLE: bootstrap3 theme. Can be also 'bs2', 'default'
        editableOptions.theme = 'bs3';

        getMe();
        getBoardUsers();

        $rootScope.$on("$routeChangeStart", routeChange);

        function routeChange(event, current) {
            var githubUser = githubService.users.getFromSession();

            if (Trello.authorized() && githubUser !== null) {

                checkPermission(event, current);

            }
            else if (current.$$route.originalPath !== '/login') {
                $location.path('/login');
            }
        }

        function checkPermission(event, current) {
            var nav_element = $('#nav');

            var repositrySession = {
                id: 'RepositrySelected'
            };

            var boardSession = {
                id: 'BoardSelected'
            };

            var repositrySelected = storageService.session.get(repositrySession);
            var boardSelected = storageService.session.get(boardSession);

            if (!repositrySelected &&
                current.$$route.originalPath !== '/repository') {

                nav_element.hide();
                $location.path('/repository');
            }
            else if (repositrySelected &&
                !boardSelected &&
                current.$$route.originalPath !== '/board') {

                nav_element.hide();
                $location.path('/board');
            }
            else if (boardSelected && repositrySelected) {
                nav_element.show();

                var route_permission = sessionService.checkRoutePermission(current.$$route);
                if (!route_permission) {
                    var prev_route = storageService.session.get({
                        id: 'Route'
                    });
                    if (sessionService.checkRoutePermission(prev_route)) {
                        $location.path(prev_route.originalPath);
                    }
                    else {
                        $location.path('/configuration');
                    }
                }
                else {
                    //save route in session
                    var session = {
                        id: 'Route',
                        data: current.$$route
                    }
                    storageService.session.put(session);
                }
            }
        }

        function getBoardUsers() {

            var boardSelected = trelloService.boards.getFromSession();
            var boardUsers = trelloService.boards.getUsersFromSession();

            if (typeof boardSelected !== 'undefined' &&
                boardSelected !== null &&
                (
                    typeof boardUsers == 'undefined' ||
                    boardUsers == null
                )
            ) {
                trelloService.boards.getLists(boardSelected.id).then(
                    function(result) {
                        var lists = result.data;
                        var members = [];
                        var usersList = _.find(lists, {
                            'name': 'Users'
                        });

                        _.forEach(
                            usersList.cards,
                            function(card) {
                                card = _.merge(
                                    card,
                                    jsonFormatterService.stringToJson(card.desc)
                                );

                                members.push(
                                    _.pick(
                                        card, [
                                            'id',
                                            'avatarHash',
                                            'initials',
                                            'fullName',
                                            'username',
                                            'confirmed',
                                            'memberType',
                                            'roles',
                                        ]
                                    )
                                );
                            }
                        );

                        trelloService.boards.postUsersInSession(members);
                    },
                    function(err) {
                        throw err;
                    }
                );
            }
        }

        function getMe() {
            var userLogged = trelloService.user.getFromSession();
            if (typeof userLogged == 'undefined' || userLogged == null) {
                trelloService.members.me().then(
                    function(result) {
                        trelloService.user.postInSession(result.data);
                    },
                    function(err) {
                        throw err;
                    }
                );
            }
        }

    }
})();
