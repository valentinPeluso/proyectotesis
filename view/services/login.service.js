(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', '$q', '$location'];

    function loginService($http, $q, $location) {
        var service = {
            loginWithTrello: loginWithTrello,
            loginWithGithub: loginWithGithub
        };

        return service;   

        function loginWithGithub() {
            var deferred = $q.defer();
            
            return deferred.promise;
        }
        function loginWithTrello() {
            $http.get('/trello/me').then(
                function (data) {
                    console.log(data);
                }, function(error) {
                    console.log(error);
                })
            /* global Trello */
            // Trello.authorize({
            //     type: 'popup',
            //     name: 'Getting Started Application',
            //     scope: {
            //         read: 'true',
            //         write: 'true' },
            //     expiration: 'never',
            //     success: function() {
            //         $location.path('/configuration');
            //     },
            //     error: function(error) {
                  
            //     }
            // });
        }
    }

})();