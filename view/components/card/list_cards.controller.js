(function() {
    'use strict';
    /*global angular */
    angular.module('app.components')
        .controller('listCardsComponentController', listCardsComponentController)

    listCardsComponentController.$inject = [
        'trelloService',
        '$q',
        'jsonFormatterService',
        'UICardService',
        'UIRequerimentService',
        'githubService',
        '$route',
        '$rootScope'
    ];

    function listCardsComponentController(
        trelloService,
        $q,
        jsonFormatterService,
        UICardService,
        UIRequerimentService,
        githubService,
        $route,
        $rootScope
    ) {
        var vm = this;

        vm.cards = [];

        var boardSelected = trelloService.boards.getFromSession();
        var boardStates = trelloService.boards.getStatesFromSession();

        $rootScope.$on('cardInserted', function(event, cardInserted) {
            if (cardInserted.idList == vm.list.id) {
                debugger;
                inserted(
                    cardInserted.index,
                    cardInserted.item,
                    cardInserted.external,
                    cardInserted.type
                );
            }
        });

        this.$onChanges = function(changesObj) {
            if (changesObj.idList.currentValue) {
                vm.idList = changesObj.idList.currentValue;
                vm.cards = [];
                activate();
            }
        };

        vm.openCard = openCard;
        vm.removeCard = removeCard;
        vm.finishSprint = finishSprint;
        vm.inserted = inserted;

        function activate() {
            var promise = $q.all([
                trelloService.lists.getList(vm.idList),
                trelloService.boards.getMembers(boardSelected.id),
                githubService.repos.getPullRequests(),
                trelloService.boards.getCards(boardSelected.id),
                trelloService.boards.getLists(boardSelected.id),
            ]).then(
                function(result) {
                    vm.list = result[0].data;
                    vm.cards = vm.list.cards;
                    vm.members = result[1].data;
                    vm.possible_pull_request = result[2].data;
                    vm.requerimentList = _.find(result[4].data, {
                        'name': 'Requeriments'
                    });
                    /*global _ */
                    vm.possible_issue_links = _.filter(result[3].data, function(card) {
                        return card.idList !== vm.requerimentList.id;
                    });

                    vm.states = boardStates;
                    _.forEach(
                        vm.cards,
                        function(card) {
                            card = _.merge(
                                card,
                                jsonFormatterService.stringToJson(card.desc)
                            );
                            card.idList = vm.idList;

                            if (typeof card.reporter !== 'undefined') {
                                var reporter = [];
                                _.forEach(card.reporter, function(idReporter) {
                                    reporter.push(
                                        _.merge(
                                            _.find(
                                                angular.copy(vm.members), {
                                                    id: idReporter
                                                }
                                            ), {
                                                selected: true
                                            }
                                        )
                                    );
                                });
                                card.reporter = reporter;
                            }

                            var cardStates = [];
                            _.forEach(
                                card.states,
                                function(idState) {
                                    cardStates.push(
                                        _.find(
                                            vm.states, {
                                                id: idState
                                            }
                                        )
                                    );
                                }
                            );
                            card.states = cardStates;

                            if (typeof card.assignee !== 'undefined') {
                                var assignees = [];
                                _.forEach(
                                    card.assignee,
                                    function(idMember) {
                                        assignees.push(
                                            _.find(
                                                vm.members, {
                                                    id: idMember
                                                }
                                            )
                                        );
                                    }
                                );
                                card.assignee = assignees;
                            }

                            var issue_links = [];
                            _.forEach(card.issue_links, function(idIssueLink) {
                                issue_links.push(
                                    _.merge(
                                        _.find(
                                            vm.possible_issue_links, {
                                                id: idIssueLink
                                            }
                                        ), {
                                            selected: true
                                        }
                                    )
                                );
                            });
                            card.issue_links = issue_links;
                            setPullRequest(card);
                        }
                    );
                    if (vm.idLinkedCard) {
                        vm.cards = _.filter(vm.cards, ['idRequeriment', vm.idLinkedCard]);
                    }
                },
                function(err) {
                    throw err;
                });

            vm.promise = {
                promise: promise,
                message: 'Loading'
            };

            vm.onOpen({
                promise: promise
            });
        }

        function checkIfPullRequestWasMerged(card) {
            var stateClosed = getStateByName('Closed');
            var stateReadyForTest = getStateByName('Ready for test');
            var cardStatesIds = _.map(card.states, 'id');

            if (card.pullRequest.merged_at !== null &&
                !_.includes(cardStatesIds, stateClosed.id) &&
                !_.includes(cardStatesIds, stateReadyForTest.id)
            ) {
                debugger;
                //Todavia no marco en la card que el PR fue mergiado
                var removeStateReadyForDevPromise = removeState(card, "Ready for dev");
                var removeStateCarryOverPromise = removeState(card, "Carry over");
                var assigneeStateReadyForTestPromise = assigneeState(card, "Ready for test");
                var promises = [];

                if (typeof removeStateReadyForDevPromise !== 'undefined')
                    promises.push(removeStateReadyForDevPromise);

                if (typeof removeStateCarryOverPromise !== 'undefined')
                    promises.push(removeStateCarryOverPromise);

                if (typeof assigneeStateReadyForTestPromise !== 'undefined')
                    promises.push(assigneeStateReadyForTestPromise);

                if (typeof removeStateReadyForDevPromise !== 'undefined' ||
                    typeof removeStateCarryOverPromise !== 'undefined' ||
                    typeof assigneeStateReadyForTestPromise !== 'undefined'
                ) {
                    promises.push(updateCard(card));
                }

                if (promises.length > 0) {
                    var promise = $q.all(
                        promises
                    ).then(
                        function(result) {
                            $route.reload();
                        },
                        function(err) {
                            throw err;
                        });
                    vm.promise = {
                        promise: promise,
                        message: 'Loading'
                    };
                }
            }
        }

        function setPullRequest(card) {
            if (card.pullRequestNumber) {
                card.pullRequest = _.find(
                    vm.possible_pull_request, {
                        number: card.pullRequestNumber
                    }
                );

                checkIfPullRequestWasMerged(card);
            }
        }

        function getStateByName(stateName) {
            var boardStates = trelloService.boards.getStatesFromSession();
            return _.find(
                boardStates, {
                    name: stateName
                }
            );
        }

        function assigneeState(card, stateName) {
            var cardState = getStateByName(stateName);
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

        function removeState(card, state) {
            var cardState = _.find(card.states, {
                name: state
            });
            if (typeof cardState !== 'undefined') {
                var bodyRemoveState = {
                    idLabel: cardState.id
                };
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
                );
            }
            else {
                return undefined;
            }

        }

        function openCard(card) {
            switch (vm.type) {
                case "CARD":
                    if (vm.allowUpdateCard) {
                        UICardService.updateCard(card.id, card.name);
                    }
                    else {
                        UICardService.open(
                            card.id,
                            card.name,
                            vm.allowSelectPullRequest,
                            vm.allowCloseCard
                        );
                    }
                    break;
                case "REQUERIMENT":
                    UIRequerimentService.update(card);
                    break;
                default:
                    break;
            }
        }

        function removeCard(cards, index, card) {
            cards.splice(index, 1);
            if (typeof vm.onRemove !== 'undefined') {
                vm.onRemove({
                    card: card
                });
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

        function finishSprint() {
            var cardsClosed = _.filter(vm.list.cards, {
                closed: true
            });
            var cardsDontClosed = _.filter(vm.list.cards, {
                closed: false
            });

            var promises = _.concat(
                generateDoc(cardsClosed),
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

        function generateDoc(cardsClosed) {
            /* 
            Para todas las cards con el estado "Closed" se genera un doc en 
            una card especial especificando todo el history que fue sucediendo 
            en cada una de las cards (todos los comentarios y descripciones). 
            El nombre de la card se corresponde con el nombre del sprint. 
            */
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

        function inserted(index, item, external, type) {
            var promises = [];
            var cardStatesIds = _.map(item.states, 'id');
            var stateClosed = getStateByName('Closed');
            var stateReadyForTest = getStateByName('Ready for test');
            var stateCarryOver = getStateByName('Carry over');
            var hasStateCarryOver = _.includes(cardStatesIds, stateCarryOver.id);
            var hasStateReadyForTest = _.includes(cardStatesIds, stateReadyForTest.id);
            var hasStateClosed = _.includes(cardStatesIds, stateClosed.id);
            var hasPullRequest = typeof item.idPullRequest !== 'undefined';
            debugger;
            if (vm.list.id == vm.idBacklogList &&
                !hasStateCarryOver &&
                !hasStateReadyForTest &&
                !hasStateClosed &&
                !hasPullRequest
            ) {
                //esta moviendo una card desde un sprint al backlog
                promises.push(removeState(item, "Ready for dev"));
                promises.push(assigneeState(item, "Not started"));
                promises.push(moveCard(item, vm.list.id));
                promises.push(updateCard(item));

            }
            else if (item.idList == vm.idBacklogList) {
                //esta moviendo una card de la lista de backlog a un sprint
                promises.push(removeState(item, "Not started"));
                promises.push(assigneeState(item, "Ready for dev"));
                promises.push(moveCard(item, vm.list.id));
                promises.push(updateCard(item));
            }
            else if (vm.list.id !== vm.idBacklogList &&
                item.idList !== vm.idBacklogList &&
                !hasStateReadyForTest &&
                !hasStateClosed
            ) {
                //esta moviendo una card de un sprint a otro
                promises.push(moveCard(item, vm.list.id));
            }

            var promise = $q.all(
                promises
            ).then(
                function(result) {
                    $route.reload();
                },
                function(err) {
                    throw err;
                });
            vm.promise = {
                promise: promise,
                message: 'Loading'
            };
        }

        activate();

    }

})();
