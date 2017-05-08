(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller('viewCardController', viewCardController)

    viewCardController.$inject = [
        'idCard',
        'cardName',
        'allowSelectPullRequest',
        'allowCloseCard',
        '$uibModalInstance'
    ];

    function viewCardController(
        idCard,
        cardName,
        allowSelectPullRequest,
        allowCloseCard,
        $uibModalInstance
    ) {
        var vm = this;
        vm.allowSelectPullRequest = allowSelectPullRequest;
        vm.allowCloseCard = allowCloseCard;
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
