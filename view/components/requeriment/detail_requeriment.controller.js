(function() {
    'use strict';

    angular.module('app.components')
        .controller('detailRequerimentComponentController', detailRequerimentComponentController)

    detailRequerimentComponentController.$inject = ['mockedObjectsService', 'sessionService', '$location', 'jsonFormatterService', 'trelloService']

    function detailRequerimentComponentController(mockedObjectsService, sessionService, $location, jsonFormatterService, trelloService) {
        var vm = this;

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
