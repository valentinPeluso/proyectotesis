(function () {
    'use strict';

    angular.module('app')
        .config(routes)
        
        routes.$inject= ['$routeProvider']

    function routes($routeProvider) {
         $routeProvider
            .when('/verificacionvalidacion', {
                templateUrl: '/proyectotesis/view/verificacion_validacion/verificacion_validacion.html',
                controller: 'verificacionValidacionController',
                controllerAs: 'vm'
            })            
            .otherwise({
                redirectTo: '/verificacionvalidacion'
            });
        
    }
})();