(function () {
    'use strict';

    angular.module('app')
        .config(routes)
        
        routes.$inject= ['$routeProvider']

    function routes($routeProvider) {
         $routeProvider
            .when('/configuration', {
                templateUrl: '/view/configuration/configuration.html',
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
                templateUrl: '/view/verification_validation/verification_validation.html',
                controller: 'verificationValidationController',
                controllerAs: 'vm',
                roles: [
                    'Verification_Validation', 
                    'Admin'
                ]
            })
            .when('/analysis', {
                templateUrl: '/view/analysis/analysis.html',
                controller: 'analysisController',
                controllerAs: 'vm',
                roles: [
                    'Admin', 
                    'Analysis'
                ]
            })
            .when('/requirements', {
                templateUrl: '/view/requirements/requirements.html',
                controller: 'requirementsController',
                controllerAs: 'vm',
                roles: [
                    'Requeriment', 
                    'Admin'
                ]
            }) 
            .when('/development', {
                templateUrl: '/view/development/development.html',
                controller: 'developmentController',
                controllerAs: 'vm',
                roles: [
                    'Developmen', 
                    'Admin'
                ]
            })
            .when('/board', {
                templateUrl: '/view/board/board.html',
                controller: 'boardController',
                controllerAs: 'vm',
            })
            .otherwise({
                redirectTo: '/configuration'
            });
        
    }
})();