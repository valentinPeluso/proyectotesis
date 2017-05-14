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
                type: '<', // REQUERIMENT | CARD
                idBacklogList: '<',
                allowFinishSprint: '<',
                allowUpdateCard: '<',
                allowCloseCard: '<',
                allowSelectPullRequest: '<'
            }
        });

    panelComponentController.$inject = [
        '$sce',
        'trelloService',
        'jsonFormatterService',
        '$q',
        '$route',
        '$rootScope'
    ];

    function panelComponentController(
        $sce,
        trelloService,
        jsonFormatterService,
        $q,
        $route,
        $rootScope
    ) {
        var vm = this;

        vm.inserted = inserted;
        vm.click = click;
        vm.onRemove = onRemove;
        vm.onOpen = onOpen;

        function inserted(index, item, external, type) {
            vm.cardInserted = {
                index: index,
                item: item,
                external: external,
                type: type,
                idList: vm.list.id
            }
            $rootScope.$broadcast('cardInserted', vm.cardInserted);
        };

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

        function removeState(card, state) {
            var cardState = _.find(card.states, {
                name: state
            });
            if (typeof cardState !== 'undefined') {
                var bodyRemoveState = {
                    idLabel: cardState.id
                }
                _.remove(
                    card.states,
                    function(state) {
                        return state.id == cardState.id;
                    }
                );
                return trelloService.cards.removeState(
                    card.id,
                    cardState.id,
                    bodyRemoveState
                )
            }
            else {
                return undefined;
            }

        }

        function assigneeState(card, state) {
            var boardStates = trelloService.boards.getStatesFromSession();
            var cardState = _.find(
                boardStates, {
                    name: state
                }
            );
            var hasState = _.includes(
                _.map(
                    card.states,
                    'id'
                ),
                cardState.id
            );

            if (!hasState) {

                var bodyState = {
                    value: cardState.id
                };
                card.states.push(cardState);
                return trelloService.cards.assigneeState(
                    card.id,
                    bodyState
                );
            }
            else {
                return undefined;
            }
        }

        function updateCard(card) {
            card.assignee = _.map(card.assignee, 'id');
            card.issue_links = _.map(card.issue_links, 'id');
            card.reporter = _.map(card.reporter, 'id');
            card.states = _.map(card.states, 'id');

            if (typeof card.pull_request !== 'undefined') {
                card.pull_request = _.head(card.pull_request);
                card.idPullRequest = _.toString(card.pull_request.id);
                card.pullRequestNumber = card.pull_request.number;
            }

            var updateCard = _.pick(
                card, [
                    'priority',
                    'points',
                    'description',
                    'assignee',
                    'reporter',
                    'issue_links',
                    'states',
                    'idRequeriment',
                    'idPullRequest',
                    'pullRequestNumber'
                ]
            );

            var bodyCard = {
                name: card.name,
                desc: jsonFormatterService.jsonToString(updateCard),
                idMembers: card.assignee
            };
            return trelloService.cards.update(
                card.id,
                bodyCard
            );
        }
    }

})();
