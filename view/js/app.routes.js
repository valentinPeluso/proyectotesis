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
            .when('/requirements', {
                templateUrl: '/proyectotesis/view/requirements/requirements.html',
                controller: 'requirementsController',
                controllerAs: 'vm'
            })               
            .otherwise({
                redirectTo: '/verificacionvalidacion'
            });
        
    }
})();