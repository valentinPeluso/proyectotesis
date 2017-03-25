(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller(
            'viewCreateAttachmentController',
            viewCreateAttachmentController
        );

    viewCreateAttachmentController.$inject = [
        'idAttachmentList',
        '$uibModalInstance'
    ];

    function viewCreateAttachmentController(
        idAttachmentList,
        $uibModalInstance
    ) {
        var vm = this;

        vm.idAttachmentList = angular.copy(idAttachmentList);

        vm.cancel = cancel;

        function cancel() {
            $uibModalInstance.dismiss();
        }
    };
})();
