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
        });



})();
