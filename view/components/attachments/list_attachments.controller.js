(function() {
    'use strict';

    angular.module('app.components')
        .controller(
            'listAttachmentsComponentController',
            listAttachmentsComponentController
        );

    listAttachmentsComponentController.$inject = [
        'trelloService',
        '$q',
        'jsonFormatterService',
        'UIAttachmentService'
    ];

    function listAttachmentsComponentController(
        trelloService,
        $q,
        jsonFormatterService,
        UIAttachmentService
    ) {
        var vm = this;

        vm.attachments = [];

        vm.createAttachment = createAttachment;
        vm.updateAttachment = updateAttachment;
        vm.removeAttachment = removeAttachment;
        vm.$onInit = onInit;

        this.$onChanges = function(changesObj) {
            if (changesObj.idAttachmentList.currentValue) {
                vm.idAttachmentList = changesObj.idAttachmentList.currentValue;
            };
        };

        function onInit() {
            var promise = trelloService.lists.getList(vm.idAttachmentList).then(
                function(result) {
                    vm.attachments = result.data;
                },
                function(err) {
                    console.log();
                });

            vm.promise = {
                promise: promise,
                message: 'Loading attachments'
            };
        }

        function createAttachment() {
            UIAttachmentService.create(vm.idAttachmentList);
        }

        function updateAttachment() {

        }

        function removeAttachment() {

        }

    }

})();
