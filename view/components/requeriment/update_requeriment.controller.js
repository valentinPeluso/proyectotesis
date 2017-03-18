(function() {
    'use strict';

    angular.module('app.components')
        .controller('updateRequerimentComponentController', updateRequerimentComponentController)

    updateRequerimentComponentController.$inject = ['mockedObjectsService', 'sessionService', '$location', 'jsonFormatterService', 'trelloService']

    function updateRequerimentComponentController(mockedObjectsService, sessionService, $location, jsonFormatterService, trelloService) {
        var vm = this;

        var promise = trelloService.cards.getCard(vm.idRequeriment).then(
            function(result) {
                vm.requeriment = result.data;
                vm.requeriment = _.merge(vm.requeriment, jsonFormatterService.stringToJson(vm.requeriment.desc));
                debugger;
            },
            function(err) {
                console.log();
            });

        vm.promiseGetRequeriment = {
            promise: promise,
            message: 'Loading requeriment'
        };



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
