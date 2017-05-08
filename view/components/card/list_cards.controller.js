(function() {
    'use strict';

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
            };
        };

        vm.openCard = openCard;
        vm.removeCard = removeCard;

        function activate() {
            var promise = $q.all([
                trelloService.lists.getList(vm.idList),
                trelloService.boards.getMembers(boardSelected.id),
                githubService.repos.getPullRequests()
            ]).then(
                function(result) {
                    vm.cards = result[0].data.cards;
                    vm.members = result[1].data;
                    vm.possible_pull_request = result[2].data;

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
                                    )
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
                            setPullRequest(card);
                        }
                    );
                    if (vm.idLinkedCard) {
                        vm.cards = _.filter(vm.cards, ['idRequeriment', vm.idLinkedCard]);
                    }
                },
                function(err) {
                    console.log();
                });

            vm.promise = {
                promise: promise,
                message: 'Loading'
            };

            vm.onOpen({
                promise: promise
            });
        }

        function setPullRequest(card) {
            if (card.pullRequestNumber) {
                card.pullRequest = _.find(
                    vm.possible_pull_request, {
                        number: card.pullRequestNumber
                    }
                );
                if (card.pullRequest.merged_at) {
                    var removeStatePromise = removeState(card, "Ready for dev");
                    var assigneeStatePromise = assigneeState(card, "Ready for test");
                    var promises = [];
                    if (typeof removeStatePromise !== 'undefined')
                        promises.push(removeStatePromise);
                    if (typeof assigneeStatePromise !== 'undefined')
                        promises.push(assigneeStatePromise);
                    if (typeof removeStatePromise !== 'undefined' ||
                        typeof assigneeStatePromise !== 'undefined')
                        promises.push(updateCard(card));

                    if (promises.length > 0) {
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
                    }
                }
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
                    UIRequerimentService.update(card)
                    break;
                default:
                    break;
            };
        };

        function removeCard(cards, index, card) {
            cards.splice(index, 1);
            if (typeof vm.onRemove !== 'undefined') {
                vm.onRemove({
                    card: card
                })
            }
        }

        function updateCard(card) {
            card.assignee = _.map(card.assignee, 'id');
            card.issue_links = _.map(card.issue_links, 'id');
            card.reporter = _.map(card.reporter, 'id');
            card.states = _.map(card.states, 'id');

            var bodyCard = {
                name: card.name,
                desc: jsonFormatterService.jsonToString(
                    _.pick(
                        card, [
                            'priority',
                            'points',
                            'description',
                            'assignee',
                            'reporter',
                            'issue_links',
                            'states',
                            'idRequeriment',
                            'pullRequestNumber'
                        ]
                    )
                ),
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
