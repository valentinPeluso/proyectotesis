(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('statesService', statesService);

    statesService.$inject = [];

    function statesService() {
        var service = {
            get: get
        };

        return service;
        
        function  get() {
            return [                
                {
                    id: 1,
                    label: 'No started',
                    clases: 'label label-info'
                },
                {
                    id: 2,
                    label: 'Redy for dev',
                    clases: 'label label-primary'
                },
                {
                    id: 3,
                    label: 'Closed',
                    clases: 'label label-success'
                },
                {
                    id: 4,
                    label: 'Carry over',
                    clases: 'label label-danger'
                },
                {
                    id: 5,
                    label: 'Ready for check',
                    clases: 'label label-warning'
                },
                {
                    id: 6,
                    label: 'Ready for test',
                    clases: 'label label-warning'
                }                
            ]
        }        
       
    }

})();