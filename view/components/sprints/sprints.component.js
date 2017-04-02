(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgSprints', {
            templateUrl: '/view/components/sprints/sprints.html',
            controller: sprintsComponentController,
            bindings: {
                allowMoveCard: '<'
            }
        });

    sprintsComponentController.$inject = [
        'mockedObjectsService',
        'UICardService',
        'trelloService',
        'jsonFormatterService',
        '$filter'
    ]

    function sprintsComponentController(
        mockedObjectsService,
        UICardService,
        trelloService,
        jsonFormatterService,
        $filter
    ) {
        var vm = this;

        var boardSelected = trelloService.boards.getFromSession();

        var promise = trelloService.boards.getLists(boardSelected.id).then(
            function(result) {
                vm.sprints = _.orderBy(
                    _.filter(
                        result.data,
                        function(list) {
                            return list.name !== 'Requeriments' &&
                                list.name !== 'Attachments' &&
                                list.name !== "Backlog"
                        }
                    ), [
                        'name'
                    ]
                );
                var sprints_copy = angular.copy(vm.sprints);
                _.forEach(vm.sprints, function(sprint, index) {
                    sprint.opened = false;
                    if ((index + 1) < sprints_copy.length) {
                        sprint.idNextSprint = sprints_copy[index + 1].id;
                    }

                    var cards_points = [];
                    _.forEach(sprint.cards, function(card) {
                        card = _.merge(
                            card,
                            jsonFormatterService.stringToJson(card.desc)
                        );
                        cards_points.push(card.points);
                    })
                    sprint.points_to_do = _.sum(cards_points);
                    sprint.points_made = 0;

                })

                vm.backlog = _.find(result.data, {
                    name: 'Backlog'
                });
                vm.backlog.opened = false;
            },
            function() {

            })

        // vm.openSprint = openSprint;
        // vm.openBacklog = openBacklog;

        vm.backlog = [];
        vm.sprints = [];

        // function openBacklog() {
        //     vm.backlog.opened = !vm.backlog.opened;
        // };

        // function openSprint(sprint) {
        //     sprint.opened = !sprint.opened;
        // };
    }

})();
