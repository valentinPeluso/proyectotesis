(function() {
    'use strict';

    angular.module('app.components')
        .controller('detailCardComponentController', detailCardComponentController)

    detailCardComponentController.$inject = [
        'trelloService',
        '$q',
        'jsonFormatterService',
        'githubService'
    ];

    function detailCardComponentController(
        trelloService,
        $q,
        jsonFormatterService,
        githubService
    ) {
        var vm = this;

        vm.card = {};
        vm.possible_assignees = [];
        vm.possible_reporter = [];
        vm.possible_issue_links = [];
        vm.possible_pull_request = [];

        var repositorySelected = githubService.repos.getFromSession();

        // vm.saveCard = saveCard;
        // vm.resetCard = resetCard;
        vm.selectPullRequest = selectPullRequest;

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

    }

})();
