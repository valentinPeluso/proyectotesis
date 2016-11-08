(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCards', {
            templateUrl: '/view/components/cards/cards.html',
            controller: cardsComponentController,
            bindings: {
                cards: '<'
            }
        });
        
    cardsComponentController.$inject = ['mockedObjectsService', 'UICardService']    

    function cardsComponentController(mockedObjectsService, UICardService) {
        var vm = this;
        
        vm.openCard = openCard;
        vm.removeCard = removeCard;
        
        function openCard(card) {
            UICardService.open(card);
        };
        function removeCard(cards, index) {
            cards.splice(index, 1);
        }
    }

})();