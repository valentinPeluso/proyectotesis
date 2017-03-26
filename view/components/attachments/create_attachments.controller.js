(function() {
    'use strict';

    angular.module('app.components')
        .controller(
            'createAttachmentsComponentController',
            createAttachmentsComponentController
        );

    createAttachmentsComponentController.$inject = [
        'trelloService',
        '$q',
        'jsonFormatterService',
        'UIAttachmentService',
        'Upload'
    ];

    function createAttachmentsComponentController(
        trelloService,
        $q,
        jsonFormatterService,
        UIAttachmentService,
        Upload
    ) {
        var vm = this;

        vm.attachments = [];

        vm.createAttachment = createAttachment;
        vm.reset = reset;
        vm.upload = upload;

        this.$onChanges = function(changesObj) {
            if (changesObj.idAttachmentList.currentValue) {
                vm.idAttachmentList = changesObj.idAttachmentList.currentValue;
                activate();
            };
        };

        function activate() {

        }

        function upload($file) {
            vm.attachment.fileName = $file.name;
            Upload.base64DataUrl($file).then(
                function(urls) {
                    vm.attachment.file = urls;
                }
            );
        }

        function createAttachment() {
            var deferred = $q.defer();

            vm.promise = {
                promise: deferred.promise,
                message: 'Creating card'
            };

            var card = {
                name: vm.attachment.name,
                desc: vm.attachment.desc
            };

            trelloService.lists.createCard(vm.idAttachmentList, card).then(
                function(result) {
                    var cardCreated = result.data;
                    var body = {
                        file: vm.attachment.file
                    }
                    trelloService.cards.addAttachment(
                        cardCreated.id,
                        body
                    ).then(function(result) {
                        deferred.resolve();
                        debugger;
                    }, function(err) {});
                },
                function(err) {});

        }

        function reset() {
            vm.attachment = {};
        }

    }

})();
