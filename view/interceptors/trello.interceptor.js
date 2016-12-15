(function () {
    'use strict';

    angular
        .module('app.interceptors')
        .factory('trelloInterceptor', trelloInterceptor);

    trelloInterceptor.$inject = [];

    function trelloInterceptor() {
        var service = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };

        return service;   

        function request(config) {
            return config;
        }
        function requestError(config) {
            return config;
        }
        function response(config) {
            return config;
        }
        function responseError(config) {
            return config;
        }
    }

})();