(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCreateCard', {
            templateUrl: '/proyectotesis/view/components/card/create_card.html',
            controller: 'createCardComponentController',
            bindings: {
                idBacklogList: '<',
                idAttachmentList: '<',
                idRequeriment: '<'
            }
        })
        .component('tgUpdateCard', {
            templateUrl: '/proyectotesis/view/components/card/update_card.html',
            controller: 'updateCardComponentController',
            bindings: {
                idCard: '<'
            }
        })
        .component('tgDetailCard', {
            templateUrl: '/proyectotesis/view/components/card/detail_card.html',
            controller: 'detailCardComponentController',
            bindings: {
                idCard: '<',
                allowSelectPullRequest: '<',
                allowCloseCard: '<'
            }
        })
        .component('tgListCards', {
            templateUrl: '/proyectotesis/view/components/card/list_cards.html',
            controller: 'listCardsComponentController',
            bindings: {
                idList: '<',
                idLinkedCard: '<',
                idBacklogList: '<',
                allowMoveCard: '<',
                onOpen: '&',
                type: '<', // REQUERIMENT | CARD
                onRemove: '&',
                allowUpdateCard: '<',
                allowSelectPullRequest: '<',
                allowCloseCard: '<',
                allowFinishSprint: '<'
            }
        });



})();
