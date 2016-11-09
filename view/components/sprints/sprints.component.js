(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgSprints', {
            templateUrl: '/view/components/sprints/sprints.html',
            controller: sprintsComponentController
        });
        
    sprintsComponentController.$inject = ['mockedObjectsService', 'UICardService']    

    function sprintsComponentController(mockedObjectsService, UICardService) {
        var vm = this;
        
        vm.openSprint = openSprint;
        vm.openBacklog = openBacklog;

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
    }

})();