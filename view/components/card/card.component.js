(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCreateCard', {
            templateUrl: '/view/components/card/create_card.html',
            controller: 'createCardComponentController',
            bindings: {
                idBacklogList: '<',
                idAttachmentList: '<',
                idRequeriment: '<'
            }
        })
        .component('tgUpdateCard', {
            templateUrl: '/view/components/card/update_card.html',
            controller: 'updateCardComponentController',
            bindings: {
                idCard: '<'
            }
        })
        .component('tgListCards', {
            templateUrl: '/view/components/card/list_cards.html',
            controller: 'listCardsComponentController',
            bindings: {
                idList: '<',
                idLinkedCard: '<',
                allowMoveCard: '<',
                onOpen: '&',
                type: '<', // REQUERIMENT | CARD
                onRemove: '&'
            }
        });



})();
