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
                    sprint.points_to_do = _.sum(cards_points);
                    sprint.points_made = 0;
                    sprint.points_section =
                        '<span class="label label-success">' + sprint.points_made + '</span' +
                        '>&nbsp;&nbsp;' +
                        '<span class="label label-primary">' + sprint.points_to_do + '</span>';
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
