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

        //-----MOCKS-------
        vm.backlog = mockedObjectsService.sprints.getMockedBacklog();
        vm.sprints = mockedObjectsService.sprints.getMockesSprints();
        
        function openBacklog() {            
            vm.backlog.cards = mockedObjectsService.cards.getMokedCards(vm.backlog.ids_cards);
        };
        function openSprint(sprint) {
            sprint.cards = mockedObjectsService.cards.getMokedCards(sprint.ids_cards);
        };
        function openCard(card) {
            UICardService.open(card);
        };
    };
})();