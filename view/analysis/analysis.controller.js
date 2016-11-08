(function () {
    'use strict';

    angular.module('app.analysis')
    .controller('analysisController', analysisController)
    
    analysisController.$inject = ['mockedObjectsService', 'UICardService', 'UIRequerimentService'];
    
    function analysisController(mockedObjectsService, UICardService, UIRequerimentService){
        var vm = this;
        
        vm.requeriments = mockedObjectsService.requeriments.getMockedRequeriments();
        
        vm.openSprint = openSprint;
        vm.openBacklog = openBacklog;
        vm.openRequeriment = openRequeriment;

        //-----MOCKS-------
        vm.possible_assigness = mockedObjectsService.cards.getMockedPossibleAssigness();
        vm.backlog = mockedObjectsService.sprints.getMockedBacklog();
        vm.sprints = mockedObjectsService.sprints.getMockesSprints();
        
        function openBacklog(item) {
            vm.backlog.opened = !vm.backlog.opened;
            vm.backlog.cards = mockedObjectsService.cards.getMokedCards(vm.backlog.ids_cards);
             _.forEach(vm.backlog.cards, function(card, index) {
                card.assignee = _.find(vm.possible_assigness, { id : card.assignee});
            });
        };
        function openSprint(sprint) {
            sprint.opened = !sprint.opened;
            sprint.cards = mockedObjectsService.cards.getMokedCards(sprint.ids_cards);
            _.forEach(sprint.cards, function(card, index) {
                card.assignee = _.find(vm.possible_assigness, { id : card.assignee});
            });
        };
        function openRequeriment(requeriment) {
            UIRequerimentService.open(requeriment);
        }
    }
    
})();