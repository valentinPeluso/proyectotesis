(function() {
    'use strict';

    angular
        .module('app.ui_services')
        .factory('UIAttachmentService', UIAttachmentService);

    UIAttachmentService.$inject = ['$uibModal'];

    function UIAttachmentService($uibModal) {
        var service = {
            create: createAttachment
        };

        return service;

        function createAttachment(idAttachmentList) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/view/ui_services/attachment/create_attachment.html',
                controller: 'viewCreateAttachmentController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    idAttachmentList: function() {
                        return idAttachmentList;
                    }
                }
            });
            modalInstance.result.then(
                function() {},
                function() {}
            );
        }

    }

})();
