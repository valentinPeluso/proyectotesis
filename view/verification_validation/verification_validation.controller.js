(function () {
    'use strict';

    angular.module('app.verification_validation')
    .controller('verificationValidationController', verificationValidationController)
    
    verificationValidationController.$inject = ['mockedObjectsService', 'UICardService'];
    
    function verificationValidationController(mockedObjectsService, UICardService){
        var vm = this;
        
        vm.openCard = openCard;
        vm.openSprint = openSprint;
        vm.openBacklog = openBacklog;
        vm.removeCard = removeCard;

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
        function openCard(card) {
            UICardService.open(card);
        };
        function removeCard(cards, index) {
            cards.splice(index, 1);
        }
    };
})();