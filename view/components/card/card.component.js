(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCard', {
            templateUrl: '/view/components/card/card.html',
            controller: cardComponentController,
            bindings: {
                card: '<',
                save: '&'
            }
        });
        
    cardComponentController.$inject = ['mockedObjectsService', '$location']    

    function cardComponentController(mockedObjectsService, $location) {
        var vm = this;
        
        vm.location = "/"+_.words($location.$$path)[0];
        
        vm.possible_issue_links = mockedObjectsService.cards.getMockedIssuesLinks();
        vm.possible_assignees = mockedObjectsService.cards.getMockedPossibleAssigness();

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