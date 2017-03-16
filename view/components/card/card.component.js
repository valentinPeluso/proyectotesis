(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCard', {
            templateUrl: '/view/components/card/card.html',
            controller: cardComponentController,
            bindings: {
                idCard: '<', // Card relacionada con la card que se va a crear
                idList: '<' // lista en la que se va a crear la card
            }
        });

    cardComponentController.$inject = ['mockedObjectsService', '$location', 'trelloService']

    function cardComponentController(mockedObjectsService, $location, trelloService) {
        var vm = this;

        vm.location = "/" + _.words($location.$$path)[0];

        var boardSelected = trelloService.boards.getFromSession();

        var promise = trelloService.boards.getMembers(boardSelected.id).then(
            function(result) {
                vm.members = result.data;
                vm.possible_assignees = vm.members;
                vm.possible_reporter = angular.copy(vm.members);
            },
            function(err) {
                console.log();
            });

        vm.promiseBoardMembers = {
            promise: promise,
            message: 'Loading board members'
        };

        vm.possible_issue_links = mockedObjectsService.cards.getMockedIssuesLinks();
        vm.possible_labels = [];
        vm.possible_assignees = [];
        vm.possible_reporter = [];

        // requeriment id
        // var card = {
                //     id: vm.card.id
                // }
                // vm.origin_card = vm.card;
                // vm.card = angular.copy(vm.card);

        vm.saveCard = saveCard;
        vm.resetCard = resetCard;

        function saveCard() {
            vm.save({
                'card': vm.card
            });
        }

        function resetCard() {
            vm.card = angular.copy(vm.origin_card);
        }
    }

})();
