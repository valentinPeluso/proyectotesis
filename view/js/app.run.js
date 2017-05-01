(function() {
    'use strict';

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
        'githubService'
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
        githubService
    ) {

        editableOptions.theme = 'bs3'; // ANGULAR-XEDITABLE: bootstrap3 theme. Can be also 'bs2', 'default'

        trelloService.members.me().then(
            function(result) {
                trelloService.user.postInSession(result.data);
            },
            function(err) {
                debugger;
            });

        $rootScope.$on("$routeChangeStart", function(event, current) {
            var nav_element = $('#nav');

            var githubUser = githubService.users.getFromSession(session);
            if (Trello.authorized() && githubUser !== null) {

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
                    $location.path('/repository');
                }
                else if (repositrySelected &&
                    !boardSelected &&
                    current.$$route.originalPath !== '/board') {
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
            else if (current.$$route.originalPath !== '/login') {
                $location.path('/login');
            }
        });

    }
})();
