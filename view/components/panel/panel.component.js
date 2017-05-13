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
        '$route'
    ];

    function panelComponentController(
        $sce,
        trelloService,
        jsonFormatterService,
        $q,
        $route
    ) {
        var vm = this;

        vm.inserted = inserted;

        vm.click = click;
        vm.onRemove = onRemove;
        vm.onOpen = onOpen;
        vm.finishSprint = finishSprint;

        function finishSprint() {
            var cardsClosed = _.filter(vm.list.cards, {
                closed: true
            });
            var cardsDontClosed = _.filter(vm.list.cards, {
                closed: false
            });

            var promises = _.concat(
                generateDocInGithub(cardsClosed),
                moveCardsToNextSprint(cardsDontClosed)
                //,closeSprint()
            );

            var promise = $q.all(
                promises
            ).then(
                function(result) {
                    $route.reload();
                },
                function(err) {
                    debugger;
                });
            vm.promise = {
                promise: promise,
                message: 'Loading'
            };
            debugger;
        }

        function moveCardsToNextSprint(cardsDontClosed) {
            /* 
            Para todas las cards dentro del sprint que todavia no estaban en 
            el estado "Closed" entran en el proceso de carry over. A las cards
            que entran en el proceso de carry over se les agrega el estado 
            "Carry over" al estado actual de la card. 
            */
            var promises = [];
            _.forEach(cardsDontClosed, function(card) {
                promises.push(removeState(card, "Ready for dev"));
                promises.push(assigneeState(card, "Carry over"));
                promises.push(moveCard(card, vm.list.idNextSprint));
            });
            return promises

        }

        function generateDocInGithub(cardsClosed) {
            /* 
            Para todas las cards con el estado "Closed" se genera un doc en 
            github especificando todo el history que fue sucediendo en la 
            card (todos los comentarios y descripciones). El nombre del doc 
            se corresponde con el titulo de la card en snake case. 
            */


        }

        function inserted(index, item, external, type) {

            var promises = [];
            promises.push(moveCard(item, vm.list.id));

            if (vm.list.id == vm.idBacklogList) {
                //esta moviendo una card desde un sprint al backlog
                promises.push(removeState(item, "Ready for dev"));
                promises.push(assigneeState(item, "Not started"));
            }
            else if (item.idList == vm.idBacklogList) {
                //esta moviendo una card de la lista de backlog a un sprint
                promises.push(removeState(item, "Not started"));
                promises.push(assigneeState(item, "Ready for dev"));
            }

            promises.push(updateCard(item));

            var promise = $q.all(
                promises
            ).then(
                function(result) {
                    $route.reload();
                },
                function(err) {
                    debugger;
                });
            vm.promise = {
                promise: promise,
                message: 'Loading'
            };
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

        function moveCard(card, listId) {
            var bodyMove = {
                value: listId
            };
            return trelloService.cards.moveCard(
                card.id,
                bodyMove
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
