(function () {
    'use strict';

    angular.module('app')
        .run(run)
        
        run.$inject = ["editableOptions", "$rootScope", "sessionService", '$location', 'storageService', 'trelloService', '$route', '$http']

    function run(editableOptions, $rootScope, sessionService, $location, storageService, trelloService, $route, $http) {
        
        editableOptions.theme = 'bs3'; // ANGULAR-XEDITABLE: bootstrap3 theme. Can be also 'bs2', 'default'
        
        trelloService.members.me().then(
            function(result) {
                var session = {
                    id: 'TrelloUserLogged',
                    data: result.data
                }
                storageService.session.put(session);
            }, function(error) {
                console.log();
            });
        
        $rootScope.$on("$routeChangeStart", function (event, current) {
            var nav_element = $('#nav');
            if (Trello.authorized()) {
                
                var session = {
                    id: 'BoardSelected'
                }
                var boardSelected = storageService.session.get(session);
                
                if (!boardSelected && current.$$route.originalPath !== '/board') {
                    
                    $location.path('/board');
                    
                } else if (boardSelected) {
                    nav_element.show();
                
                    var route_permission = sessionService.checkRoutePermission(current.$$route);
                    if (!route_permission) {
                        var prev_route = storageService.session.get({ id : 'Route'});
                        if (sessionService.checkRoutePermission(prev_route)) {
                            $location.path(prev_route.originalPath);
                        } else {
                            $location.path('/configuration');
                        }
                    } else {
                        //save route in session
                        var session = {
                            id: 'Route',
                            data: current.$$route
                        }
                        storageService.session.put(session);
                    }  
                }
            } else {
                
            }         
        });
        
    }
})();