(function () {
    'use strict';

    angular
        .module('app.ui_services')
        .factory('UICardService', UICardService);

    UICardService.$inject = ['$uibModal'];

    function UICardService($uibModal) {
        var service = {
            open: open
        };

        return service;
        
        function open(card) {
            var modalInstance = $uibModal.open({
                animation: true,                
                templateUrl: '/proyectotesis/view/ui_services/card/card.html',
                controller: 'viewCardController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    card: function () {
                        return card;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                
            }, function () {
                
            });
        }        
    }

})();