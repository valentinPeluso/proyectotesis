(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCard', {
            templateUrl: '/proyectotesis/view/components/card/card.html',
            controller: cardComponentController,
            bindings: {
                card: '<',
                save: '&'
            }
        });
        
    cardComponentController.$inject = []    

    function cardComponentController() {
        var vm = this;

        vm.origin_card = vm.card;
        vm.card = angular.copy(vm.card); 
        
        vm.saveCard = saveCard;
        vm.resetCard = resetCard;
        
        function saveCard() {
            vm.save({ 'card' : vm.card });
        }
        function resetCard() {
            vm.card = angular.copy(vm.origin_card);
        }
    }

})();