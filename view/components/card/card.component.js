(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCreateCard', {
            templateUrl: '/view/components/card/create_card.html',
            controller: 'createCardComponentController',
            bindings: {
                idBacklogList: '<',
                idRequeriment: '<'
            }
        })
        .component('tgListCards', {
            templateUrl: '/view/components/card/list_cards.html',
            controller: 'listCardsComponentController',
            bindings: {
                idList: '<',
                idLinkedCard: '<'
            }
        });



})();
