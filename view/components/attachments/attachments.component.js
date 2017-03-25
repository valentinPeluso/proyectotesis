(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgListAttachments', {
            templateUrl: '/view/components/attachments/list_attachments.html',
            controller: 'listAttachmentsComponentController',
            bindings: {
                idAttachmentList: '<'
            }
        })
        .component('tgCreateAttachments', {
            templateUrl: '/view/components/attachments/create_attachments.html',
            controller: 'createAttachmentsComponentController',
            bindings: {
                idAttachmentList: '<'
            }
        });;

})();
