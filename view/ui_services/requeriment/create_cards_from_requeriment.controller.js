(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller(
            'viewCreateCardsFromRequerimentController',
            viewCreateCardsFromRequerimentController
        );

    viewCreateCardsFromRequerimentController.$inject = [
        'requeriment',
        'idBacklogList',
        'idAttachmentList'
    ];

    function viewCreateCardsFromRequerimentController(
        requeriment,
        idBacklogList,
        idAttachmentList
    ) {
        var vm = this;

        vm.requeriment = angular.copy(requeriment);
        vm.idBacklogList = angular.copy(idBacklogList);
        vm.idAttachmentList = angular.copy(idAttachmentList);

        vm.onOpen = onOpen;

        function onOpen(promise) {
            vm.promise = {
                promise: promise,
                message: 'Loading'
            };
        }
    }

})();
