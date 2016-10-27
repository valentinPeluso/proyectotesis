(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('pullRequestService', pullRequestService);

    pullRequestService.$inject = ["$http", "$q"];

    function pullRequestService($http, $q) {
        var service = {
            get: get,
            comment: comment,
        };

        return service;
        
        function  get() {
            return [
                {
                    id: 10,
                    label: 'Juan'
                },
                {
                    id: 1,
                    label: 'Mariano'
                },
                {
                    id: 2,
                    label: 'Sofía'
                },
                {
                    id: 3,
                    label: 'Pedro'
                },
                {
                    id: 4,
                    label: 'Micaela'
                },
                {
                    id: 5,
                    label: 'Carlos'
                },
                {
                    id: 6,
                    label: 'Laura'
                },
                {
                    id: 7,
                    label: 'Emma'
                },
                {
                    id: 8,
                    label: 'Matias'
                },
                {
                    id: 9,
                    label: 'Cristian'
                },
            ]
        }

        function comment() {
            return [
                {
                    id: 3,
                    label: 'Estrategía de anulación'
                },
                {
                    id: 1,
                    label: 'Estrategía de disminución'
                },
                {
                    id: 2,
                    label: 'Estrategía de contingencia'
                },
            ]
        }
       
    }

})();