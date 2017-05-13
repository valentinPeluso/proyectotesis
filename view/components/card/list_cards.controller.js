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
        '$route'
    ];

    function listCardsComponentController(
        trelloService,
        $q,
        jsonFormatterService,
        UICardService,
        UIRequerimentService,
        githubService,
        $route
    ) {
        var vm = this;

        vm.cards = [];

        var boardSelected = trelloService.boards.getFromSession();
        var boardStates = trelloService.boards.getStatesFromSession();

        this.$onChanges = function(changesObj) {
            if (changesObj.idList.currentValue) {
                vm.idList = changesObj.idList.currentValue;
                vm.cards = [];
                activate();
            }
        };

        vm.openCard = openCard;
        vm.removeCard = removeCard;

        function activate() {
            var promise = $q.all([
                trelloService.lists.getList(vm.idList),
                trelloService.boards.getMembers(boardSelected.id),
                githubService.repos.getPullRequests(),
                trelloService.boards.getCards(boardSelected.id),
                trelloService.boards.getLists(boardSelected.id),
            ]).then(
                function(result) {
                    vm.cards = result[0].data.cards;
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

        activate();

    }

})();
