(function () {
    'use strict';

    angular.module('app')
        .config(routes)
        
        routes.$inject= ['$routeProvider']

    function routes($routeProvider) {
         $routeProvider
            .when('/', {
                templateUrl: '/view/login/login.html',
                controller: 'loginController',
                controllerAs: 'vm',
            }) 
            .otherwise({
                redirectTo: '/'
            });
        
    }
})();