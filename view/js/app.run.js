(function() {
    'use strict';

    angular.module('app')
        .run(run)

    run.$inject = ["editableOptions", "$rootScope", "sessionService", '$location', 'storageService', 'trelloService', '$route', '$http', '$window']

    function run(editableOptions, $rootScope, sessionService, $location, storageService, trelloService, $route, $http, $window) {

        editableOptions.theme = 'bs3'; // ANGULAR-XEDITABLE: bootstrap3 theme. Can be also 'bs2', 'default'

        // $http.get().then(
        //     function(res) {
        //         debugger;
        //     },
        //     function(err) {
        //         debugger;
        //     }
        // );
        // .then(
        //     function(res) {
        //         $http.get("/github/repos/get").then(
        //             function(res) {
        //                 debugger;
        //             },
        //             function(err) {
        //                 debugger;
        //             }
        //         );
        //     },
        //     function(err) {
        //         debugger;
        //     }
        // );


        trelloService.members.me().then(
            function(result) {
                var session = {
                    id: 'TrelloUserLogged',
                    data: result.data
                }
                storageService.session.put(session);
            },
            function(err) {
                debugger;
            });

        $rootScope.$on("$routeChangeStart", function(event, current) {
            var nav_element = $('#nav');
            var session = {
                id: 'GitHubUser'
            }
            var githubUser = storageService.session.get(session);
            if (Trello.authorized() && githubUser !== null) {

                var session = {
                    id: 'BoardSelected'
                }
                var boardSelected = storageService.session.get(session);

                if (!boardSelected && current.$$route.originalPath !== '/board') {

                    $location.path('/board');

                }
                else if (boardSelected) {
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
