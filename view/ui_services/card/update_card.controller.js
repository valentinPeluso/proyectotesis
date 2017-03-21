(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller('viewUpdateCardController', viewUpdateCardController)

    viewUpdateCardController.$inject = ['idCard', 'cardName', '$uibModalInstance'];

    function viewUpdateCardController(idCard, cardName, $uibModalInstance) {
        var vm = this;

        vm.card = {
            id: angular.copy(idCard),
            name: cardName
        }

        vm.cancel = cancel;

        function cancel() {
            $uibModalInstance.dismiss();
        }
    };
})();
