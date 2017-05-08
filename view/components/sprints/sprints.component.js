(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgSprints', {
            templateUrl: '/view/components/sprints/sprints.html',
            controller: sprintsComponentController,
            bindings: {
                allowMoveCard: '<',
                allowFinishSprint: '<',
                allowUpdateCard: '<',
                allowCloseCard: '<',
                allowSelectPullRequest: '<'
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
        var boardStates = trelloService.boards.getStatesFromSession();
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
                    var cards_points_made = [];
                    _.forEach(sprint.cards, function(card) {
                        card = _.merge(
                            card,
                            jsonFormatterService.stringToJson(card.desc)
                        );
                        cards_points.push(card.points);
                        if (cardIsClosed(card)) {
                            cards_points_made.push(card.points);
                        }

                    })
                    sprint.points_to_do = _.sum(cards_points);
                    sprint.points_made = _.sum(cards_points_made);

                })

                vm.backlog = _.find(result.data, {
                    name: 'Backlog'
                });
                vm.backlog.opened = false;
            },
            function() {

            });

        function cardIsClosed(card) {
            var stateClosed = _.find(boardStates, {
                name: 'Closed'
            });
            return _.includes(card.states, stateClosed.id);
        }

        vm.backlog = [];
        vm.sprints = [];

    }

})();
