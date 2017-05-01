(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller('viewCardController', viewCardController)

    viewCardController.$inject = ['idCard', 'cardName', '$uibModalInstance'];

    function viewCardController(idCard, cardName, $uibModalInstance) {
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
