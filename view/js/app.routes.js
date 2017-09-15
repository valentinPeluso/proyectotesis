(function() {
    'use strict';

    angular.module('app')
        .config(routes)

    routes.$inject = ['$routeProvider']

    function routes($routeProvider) {
        $routeProvider
            .when('/configuration', {
                templateUrl: '/view/configuration/configuration.html',
                controller: 'configurationController',
                controllerAs: 'vm',
                roles: [
                    'Scrum_Master',
                    'Team_Member',
                    'Other',
                    'Product_Owner'
                ]
            })
            .when('/verificationvalidation', {
                templateUrl: '/view/verification_validation/verification_validation.html',
                controller: 'verificationValidationController',
                controllerAs: 'vm',
                roles: [
                    'Scrum_Master',
                    'Team_Member'
                ]
            })
            .when('/analysis', {
                templateUrl: '/view/analysis/analysis.html',
                controller: 'analysisController',
                controllerAs: 'vm',
                roles: [
                    'Scrum_Master'
                ]
            })
            .when('/requirements', {
                templateUrl: '/view/requirements/requirements.html',
                controller: 'requirementsController',
                controllerAs: 'vm',
                roles: [
                    'Scrum_Master',
                    'Product_Owner'
                ]
            })
            .when('/development', {
                templateUrl: '/view/development/development.html',
                controller: 'developmentController',
                controllerAs: 'vm',
                roles: [
                    'Scrum_Master',
                    'Team_Member'
                ]
            })
            .when('/board', {
                templateUrl: '/view/board/board.html',
                controller: 'boardController',
                controllerAs: 'vm',
            })
            .when('/repository', {
                templateUrl: '/view/repository/repository.html',
                controller: 'repositoryController',
                controllerAs: 'vm',
            })
            .when('/login', {
                templateUrl: '/view/login/login.html',
                controller: 'loginController',
                controllerAs: 'vm',
            })
            .otherwise({
                redirectTo: '/login'
            });

    }
})();
