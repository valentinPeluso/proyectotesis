(function () {
    'use strict';

    angular.module('app')
        .config(routes)
        
        routes.$inject= ['$routeProvider']

    function routes($routeProvider) {
         $routeProvider
            .when('/verificationvalidation', {
                templateUrl: '/proyectotesis/view/verification_validation/verification_validation.html',
                controller: 'verificationValidationController',
                controllerAs: 'vm'
            })
            .when('/requirements', {
                templateUrl: '/proyectotesis/view/requirements/requirements.html',
                controller: 'requirementsController',
                controllerAs: 'vm'
            })               
            .otherwise({
                redirectTo: '/verificationvalidation'
            });
        
    }
})();