(function () {
    'use strict';

    angular.module('app')
        .config(routes)
        
        routes.$inject= ['$routeProvider']

    function routes($routeProvider) {
         $routeProvider
            .when('/turnos/calendario', {
                templateUrl: '/CanchaX/turnos/calendario/calendario.html',
                controller: 'turnosCalendarioController',
                controllerAs: 'vm'
            })            
            .otherwise({
                redirectTo: '/turnos/calendario'
            });
        
    }
})();