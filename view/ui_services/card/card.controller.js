(function () {
    'use strict';

    angular.module('app.ui_services')
    .controller('viewCardController', viewCardController)
    
    viewCardController.$inject = ['card', 'mockedObjectsService'];
    
    function viewCardController(card, mockedObjectsService){
        var vm = this;
        
        vm.possible_issue_links = mockedObjectsService.cards.getMockedIssuesLinks();
        vm.possible_assignees = mockedObjectsService.cards.getMockedPossibleAssigness();
        vm.states = mockedObjectsService.cards.getMockedCardsStates();
        
        vm.card = angular.copy(card);       
        vm.card.state = _.find(vm.states, { 'id' : card.state});
       
        console.log(vm.card);
    };
})();