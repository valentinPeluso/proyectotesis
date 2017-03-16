(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCreateRequeriment', {
            templateUrl: '/view/components/requeriment/create-requeriment.html',
            controller: createRequerimentComponentController,
            bindings: {
                save: '&'
            }
        })
        .component('tgDetailRequeriment', {
            templateUrl: '/view/components/requeriment/detail-requeriment.html',
            controller: detailRequerimentComponentController,
            bindings: {
                requeriment: '<',
            }
        });

    detailRequerimentComponentController.$inject = ['mockedObjectsService', 'sessionService', '$location', 'jsonFormatterService', 'trelloService']

    function detailRequerimentComponentController(mockedObjectsService, sessionService, $location, jsonFormatterService, trelloService) {
        var vm = this;

        var boardSelected = trelloService.boards.getFromSession();

        var promise = trelloService.boards.getLists(boardSelected.id).then(
            function(result) {
                vm.lists = result.data;
            },
            function(err) {
                console.log();
            });

        vm.promiseBoardLists = {
            promise: promise,
            message: 'Loading board lists'
        };

        vm.possible_assigness = mockedObjectsService.cards.getMockedPossibleAssigness();

        vm.cards = mockedObjectsService.cards.getMokedCards();
        _.forEach(vm.cards, function(card, index) {
            card.assignee = _.find(vm.possible_assigness, {
                id: card.assignee
            });
        });

    }

    createRequerimentComponentController.$inject = ['mockedObjectsService', 'sessionService', '$location', 'jsonFormatterService', 'trelloService']

    function createRequerimentComponentController(mockedObjectsService, sessionService, $location, jsonFormatterService, trelloService) {
        var vm = this;

        vm.possible_dependencies = mockedObjectsService.requeriments.getMockedRequeriments();

        vm.saveRequeriment = saveRequeriment;
        vm.resetRequeriment = resetRequeriment;

        function saveRequeriment() {
            vm.requeriment.dependencies = _.map(vm.requeriment.dependencies, 'id');
            vm.save({
                'requeriment': vm.requeriment
            });
        }

        function resetRequeriment() {
            vm.requeriment = {};
        }
    }

})();
