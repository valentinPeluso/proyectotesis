(function () {
    'use strict';

    angular.module('app.ui_services')
    .controller('viewCardController', viewCardController)
    
    viewCardController.$inject = ['card', 'mockedObjectsService', '$location'];
    
    function viewCardController(card, mockedObjectsService, $location){
        var vm = this;
        
        vm.location = "/"+_.words($location.$$path)[0];
        
        vm.possible_issue_links = mockedObjectsService.cards.getMockedIssuesLinks();
        vm.possible_assignees = mockedObjectsService.cards.getMockedPossibleAssigness();
        vm.states = mockedObjectsService.cards.getMockedCardsStates();
        
        vm.card = angular.copy(card);       
        vm.card.state = _.find(vm.states, { 'id' : card.state});

        vm.saveCard = saveCard;
       
        console.log(vm.card);

        function saveCard(card) {
            console.log(card);
        }
    };
})();