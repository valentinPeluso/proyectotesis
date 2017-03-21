(function() {
    'use strict';

    angular
        .module('app.ui_services')
        .factory('UICardService', UICardService);

    UICardService.$inject = ['$uibModal'];

    function UICardService($uibModal) {
        var service = {
            open: open,
            updateCard: updateCard
        };

        return service;

        function open(card) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/view/ui_services/card/card.html',
                controller: 'viewCardController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    card: function() {
                        return card;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {

            }, function() {

            });
        }

        function updateCard(idCard, cardName) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/view/ui_services/card/update_card.html',
                controller: 'viewUpdateCardController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    idCard: function() {
                        return idCard;
                    },
                    cardName: function() {
                        return cardName;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {

            }, function() {

            });
        }
    }

})();
