(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgSprints', {
            templateUrl: '/view/components/sprints/sprints.html',
            controller: sprintsComponentController
        });

    sprintsComponentController.$inject = ['mockedObjectsService', 'UICardService', 'trelloService', 'jsonFormatterService']

    function sprintsComponentController(mockedObjectsService, UICardService, trelloService, jsonFormatterService) {
        var vm = this;

        var boardSelected = trelloService.boards.getFromSession();

        var promise = trelloService.boards.getLists(boardSelected.id).then(
            function(result) {
                vm.sprints = _.filter(result.data, function(list) {
                    return list.name !== 'Requeriments' && list.name !== "Backlog" && !list.closed
                });
                _.forEach(vm.sprints, function(sprint) {
                    sprint.opened = false;

                    var cards_points = [];
                    _.forEach(sprint.cards, function(card) {
                        card = _.merge(
                            card,
                            jsonFormatterService.stringToJson(card.desc)
                        );
                        cards_points.push(
                            _.pick(card, 'points')
                        );
                    })
                    sprint.points_total = _.sum(cards_points);
                })

                vm.backlog = _.find(result.data, {
                    name: 'Backlog'
                });
                vm.backlog.opened = false;
                debugger;
            },
            function() {

            })

        vm.openSprint = openSprint;
        vm.openBacklog = openBacklog;

        vm.backlog = [];
        vm.sprints = [];

        function openBacklog() {
            vm.backlog.opened = !vm.backlog.opened;
        };

        function openSprint(sprint) {
            sprint.opened = !sprint.opened;
        };
    }

})();
