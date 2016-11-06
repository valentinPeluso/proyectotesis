(function () {
    'use strict';

    angular.module('app')
        .config(routes)
        
        routes.$inject= ['$routeProvider']

    function routes($routeProvider) {
         $routeProvider
            .when('/configuration', {
                templateUrl: '/proyectotesis/view/configuration/configuration.html',
                controller: 'configurationController',
                controllerAs: 'vm',
                roles: [
                    'Verification_Validation',
                    'Requeriment', 
                    'Admin',
                    'Analysis',
                    'Developmen',
                    'Statistics',
                    'Design'
                ]
            })
            .when('/verificationvalidation', {
                templateUrl: '/proyectotesis/view/verification_validation/verification_validation.html',
                controller: 'verificationValidationController',
                controllerAs: 'vm',
                roles: ['Verification_Validation', 'Admin']
            })
            .when('/requirements', {
                templateUrl: '/proyectotesis/view/requirements/requirements.html',
                controller: 'requirementsController',
                controllerAs: 'vm',
                roles: ['Requeriment', 'Admin']
            })               
            .otherwise({
                redirectTo: '/configuration'
            });
        
    }
})();