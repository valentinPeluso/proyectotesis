(function() {
    'use strict';

    angular
        .module('app.ui_services')
        .factory('UIRequerimentService', UIRequerimentService);

    UIRequerimentService.$inject = ['$uibModal', 'sessionService', '$q'];

    function UIRequerimentService($uibModal, sessionService, $q) {
        var service = {
            update: updateRequeriment,
            createCardsFromRequeriment: createCardsFromRequeriment
        };

        return service;

        function updateRequeriment(requeriment) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/proyectotesis/view/ui_services/requeriment/update_requeriment.html',
                controller: 'viewUpdateRequerimentController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    requeriment: function() {
                        return requeriment;
                    }
                }
            });
            modalInstance.result.then(function(success) {}, function(err) {});
        }

        function createCardsFromRequeriment(
            requeriment,
            idBacklogList,
            idAttachmentList
        ) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/proyectotesis/view/ui_services/requeriment/create_cards_from_requeriment.html',
                controller: 'viewCreateCardsFromRequerimentController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    requeriment: function() {
                        return requeriment;
                    },
                    idBacklogList: function() {
                        return idBacklogList;
                    },
                    idAttachmentList: function() {
                        return idAttachmentList;
                    }
                }
            });
            modalInstance.result.then(function(success) {}, function(err) {});
        }

    }

})();
