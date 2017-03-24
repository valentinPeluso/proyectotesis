(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller('viewCreateCardsFromRequerimentController', viewCreateCardsFromRequerimentController)

    viewCreateCardsFromRequerimentController.$inject = ['requeriment', 'idBacklogList', 'jsonFormatterService', 'trelloService'];

    function viewCreateCardsFromRequerimentController(requeriment, idBacklogList, jsonFormatterService, trelloService) {
        var vm = this;

        vm.requeriment = angular.copy(requeriment);
        vm.idBacklogList = angular.copy(idBacklogList);

        vm.onOpen = onOpen;

        function onOpen(promise) {
            vm.promise = {
                promise: promise,
                message: 'Loading'
            };
        }
    }

})();
