(function () {
    'use strict';

    angular.module('app')
        .run(run)
        
        run.$inject = ["$rootScope"]

    function run($rootScope) {
        
        //editableOptions.theme = 'bs3'; // ANGULAR-XEDITABLE: bootstrap3 theme. Can be also 'bs2', 'default'
        
        // $rootScope.$on("$routeChangeStart", function (event, current) {
        //     var route_permission = sessionService.checkRoutePermission(current.$$route);
        //     if (!route_permission) {
        //         var prev_route = storageService.session.get({ id : 'Route'});
        //         $location.path(prev_route.originalPath);
        //     } else {
        //         //save route in session
        //         var session = {
        //             id: 'Route',
        //             data: current.$$route
        //         }
        //         storageService.session.put(session);
        //     }            
        // });
        
    }
})();