(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller('viewCreateCardsFromRequerimentController', viewCreateCardsFromRequerimentController)

    viewCreateCardsFromRequerimentController.$inject = ['requeriment', 'idBacklogList', 'jsonFormatterService', 'trelloService'];

    function viewCreateCardsFromRequerimentController(requeriment, idBacklogList, jsonFormatterService, trelloService) {
        var vm = this;

        vm.requeriment = angular.copy(requeriment);
        vm.idBacklogList = angular.copy(idBacklogList);

        // var boardSelected = trelloService.boards.getFromSession();

        // var promise = trelloService.boards.getLists(boardSelected.id).then(
        //     function(result) {
        //         vm.lists = result.data;

        //     },
        //     function(err) {
        //         console.log();
        //     });

        // vm.promiseBoardLists = {
        //     promise: promise,
        //     message: 'Loading board lists'
        // };

        // vm.possible_assigness = mockedObjectsService.cards.getMockedPossibleAssigness();

        // vm.cards = mockedObjectsService.cards.getMokedCards();
        // _.forEach(vm.cards, function(card, index) {
        //     card.assignee = _.find(vm.possible_assigness, {
        //         id: card.assignee
        //     });
        // });
    }

})();
