(function() {
    'use strict';

    angular.module('app.components')
        .controller('detailCardComponentController', detailCardComponentController)

    detailCardComponentController.$inject = [
        'trelloService',
        '$q',
        'jsonFormatterService',
        'githubService',
        '$route'
    ];

    function detailCardComponentController(
        trelloService,
        $q,
        jsonFormatterService,
        githubService,
        $route
    ) {
        var vm = this;

        vm.card = {};
        vm.possible_assignees = [];
        vm.possible_reporter = [];
        vm.possible_issue_links = [];
        vm.possible_pull_request = [];

        var repositorySelected = githubService.repos.getFromSession();
        var boardStates = trelloService.boards.getStatesFromSession();

        // vm.saveCard = saveCard;
        // vm.resetCard = resetCard;
        vm.selectPullRequest = selectPullRequest;
        vm.acceptValidation = acceptValidation;
        vm.rejectValidation = rejectValidation;

        var boardSelected = trelloService.boards.getFromSession();

        var promise = $q.all([
            trelloService.boards.getMembers(boardSelected.id),
            trelloService.boards.getCards(boardSelected.id),
            trelloService.cards.getCard(vm.idCard),
            trelloService.boards.getLists(boardSelected.id),
            githubService.repos.getPullRequests()
        ]).then(
            function(result) {
                vm.members = result[0].data;
                vm.possible_assignees = vm.members;
                vm.possible_reporter = angular.copy(vm.members);
                vm.requerimentList = _.find(result[3].data, {
                    'name': 'Requeriments'
                });
                vm.possible_issue_links = _.filter(result[1].data, function(card) {
                    return card.idList !== vm.requerimentList.id
                });
                vm.possible_pull_request = result[4].data;
                var card = result[2].data;
                vm.card = _.merge(card, jsonFormatterService.stringToJson(card.desc));
                vm.states = boardStates;
                parseCard();
            },
            function(err) {
                console.log();
            });

        vm.promise = {
            promise: promise,
            message: 'Loading'
        };

        function parseCard() {
            var assignee = [];
            _.forEach(vm.card.assignee, function(idAssignee) {
                assignee.push(
                    _.merge(
                        _.find(
                            vm.possible_assignees, {
                                id: idAssignee
                            }
                        ), {
                            selected: true
                        }
                    )
                );
            });
            vm.card.assignee = assignee;

            var cardStates = [];
            _.forEach(
                vm.card.states,
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
            vm.card.states = cardStates;
            vm.card.can_do_validation = _.includes(
                vm.card.states, {
                    name: 'Ready for test'
                }
            );

            var reporter = [];
            _.forEach(vm.card.reporter, function(idReporter) {
                reporter.push(
                    _.merge(
                        _.find(
                            vm.possible_reporter, {
                                id: idReporter
                            }
                        ), {
                            selected: true
                        }
                    )
                );
            });
            vm.card.reporter = reporter;

            var issue_links = [];
            _.forEach(vm.card.issue_links, function(idIssueLink) {
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
            vm.card.issue_links = issue_links;

            setPullRequest(vm.card);
        }

        function setPullRequest(card) {
            if (card.pullRequestNumber) {
                card.pullRequest = _.find(
                    vm.possible_pull_request, {
                        number: card.pullRequestNumber
                    }
                );
            }
        }

        function selectPullRequest(pullRequest) {
            vm.card.assignee = _.map(vm.card.assignee, 'id');
            vm.card.reporter = _.map(vm.card.reporter, 'id');
            vm.card.issue_links = _.map(vm.card.issue_links, 'id');

            var card = {
                name: vm.card.name,
                desc: jsonFormatterService.jsonToString(
                    _.merge(
                        _.pick(
                            vm.card, [
                                'priority',
                                'points',
                                'description',
                                'assignee',
                                'reporter',
                                'issue_links',
                                'states',
                                'idRequeriment'
                            ]
                        ), {
                            pullRequestNumber: pullRequest.number,
                        }
                    )

                ),
                idMembers: vm.card.assignee

            };

            var commentPullRequestBody = {
                description: vm.card.description,
                title: vm.card.name
            };

            var promise = $q.all([
                githubService.repos.commentPullRequestBody(pullRequest.number, commentPullRequestBody),
                trelloService.cards.update(vm.card.id, card)
            ]).then(
                function(result) {
                    debugger;
                },
                function(err) {
                    debugger;
                }
            );
            vm.promise = {
                promise: promise,
                message: 'Linking pull request to card'
            };
        }

        function acceptValidation() {
            /* 
                Tiene que actualizar el estado de la card a "Closed"
                Tiene que remover de la desc el pull request asignado
            */
            var promises = [
                removeState(vm.card, 'Ready for test'),
                assigneeState(vm.card, 'Closed'),
                updateCard(vm.card)
            ];

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

        function rejectValidation() {
            /* 
                Tiene que actualizar el estado de la card a "Ready for dev"
                Tiene que remover de la desc el pull request asignado
            */
            var promises = [
                removeState(vm.card, 'Ready for test'),
                assigneeState(vm.card, 'Ready for dev'),
                updateCard(vm.card)
            ];

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
                            'idRequeriment'
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

    }

})();
