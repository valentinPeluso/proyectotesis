(function () {
    'use strict';

    angular
        .module('app.ui_services')
        .factory('UIRequerimentService', UIRequerimentService);

    UIRequerimentService.$inject = ['$uibModal', 'sessionService'];

    function UIRequerimentService($uibModal, sessionService) {
        var service = {
            open: open
        };

        return service;
        
        function open(requeriment) {
            var modalInstance = $uibModal.open({
                animation: true,                
                templateUrl: '/view/ui_services/requeriment/requeriment.html',
                controller: 'viewRequerimentController',
                controllerAs: 'vm',
                size: getSize(),
                resolve: {
                    requeriment: function () {
                        return requeriment;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                
            }, function () {
                
            });
        }
        function getSize() {
            if (sessionService.checkPermission('Analysis')) {
                return 'lg';
            } else {
                return 'md';
            }
        }
    }

})();