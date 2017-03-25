(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgPanel', {
            templateUrl: '/view/components/panel/panel.html',
            controller: panelComponentController,
            bindings: {
                list: '<',
                allowMoveCard: '<',
                type: '<' // REQUERIMENT | CARD
            }
        });

    panelComponentController.$inject = [
        '$sce',
        'trelloService',
        'jsonFormatterService',
        '$q'
    ];

    function panelComponentController(
        $sce,
        trelloService,
        jsonFormatterService,
        $q
    ) {
        var vm = this;

        vm.inserted = function(index, item, external, type) {

            var boardStates = trelloService.boards.getStatesFromSession();
            var bodyMove = {
                value: vm.list.id
            };
            var boardStates = trelloService.boards.getStatesFromSession();
            var readyForDevState = _.find(boardStates, {
                name: "Ready for dev"
            });
            var cardState = _.find(item.states, {
                name: "Not started"
            });
            var bodyState = {
                value: readyForDevState.id
            };
            var bodyRemoveState = {
                idLabel: cardState.id
            }

            _.remove(
                item.states,
                function(state) {
                    return state.id == cardState.id;
                }
            );

            item.states.push(readyForDevState.id);
            item.assignee = _.map(item.assignee, 'id');
            item.issue_links = _.map(item.issue_links, 'id');

            var card = {
                name: item.name,
                desc: jsonFormatterService.jsonToString(
                    _.pick(
                        item, [
                            'priority',
                            'points',
                            'description',
                            'assignee',
                            'reporter',
                            'issue_links',
                            'states',
                            'idRequeriment'
                        ]
                    )
                ),
                idMembers: item.assignee

            };

            vm.list.opened = false;
            var promise = $q.all(
                [
                    trelloService.cards.moveCard(
                        item.id,
                        bodyMove
                    ),
                    trelloService.cards.removeState(
                        item.id,
                        cardState.id,
                        bodyRemoveState
                    ),
                    trelloService.cards.assigneeState(
                        item.id,
                        bodyState
                    ),
                    trelloService.cards.update(
                        item.id,
                        card
                    )
                ]
            ).then(
                function(result) {
                    var card = jsonFormatterService.stringToJson(
                        result[0].data.desc
                    );
                    vm.list.points_to_do = _.sum(
                        [
                            card.points,
                            vm.list.points_to_do
                        ]
                    );
                    vm.list.points_made = 0;
                    vm.list.id = result[0].data.idList;
                    vm.list.opened = true;
                },
                function(err) {
                    debugger;
                });
            vm.promise = {
                promise: promise,
                message: 'Loading'
            };
        };

        vm.click = click;
        vm.onRemove = onRemove;
        vm.onOpen = onOpen;

        function click() {
            vm.list.opened = !vm.list.opened;
        }

        function onOpen(promise) {
            vm.promise = promise;
        }

        function onRemove(card) {
            vm.list.points_to_do = _.subtract(
                vm.list.points_to_do,
                card.points
            );
        }
    }

})();
