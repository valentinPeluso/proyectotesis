(function() {
    'use strict';

    angular.module('app.components')
        .controller('updateCardComponentController', updateCardComponentController)

    updateCardComponentController.$inject = ['trelloService', '$q', 'jsonFormatterService']

    function updateCardComponentController(trelloService, $q, jsonFormatterService) {
        var vm = this;

        vm.card = {};
        vm.possible_assignees = [];
        vm.possible_reporter = [];
        vm.possible_issue_links = [];

        vm.saveCard = saveCard;
        vm.resetCard = resetCard;
        vm.$onInit = onInit;

        var boardSelected = trelloService.boards.getFromSession();

        function onInit() {
            var promise = $q.all([
                trelloService.boards.getMembers(boardSelected.id),
                trelloService.boards.getCards(boardSelected.id),
                trelloService.cards.getCard(vm.idCard),
                trelloService.boards.getLists(boardSelected.id)
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
        }

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

        function saveCard() {
            vm.card.assignee = _.map(vm.card.assignee, 'id');
            vm.card.reporter = _.map(vm.card.reporter, 'id');
            vm.card.issue_links = _.map(vm.card.issue_links, 'id');

            var card = {
                name: vm.card.name,
                desc: jsonFormatterService.jsonToString(
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
                    )
                ),
                idMembers: vm.card.assignee

            };

            var promise = trelloService.cards.update(vm.card.id, card).then(
                function(result) {
                    var cardCreated = result.data;
                    vm.card = {};
                },
                function(err) {});

            vm.promise = {
                promise: promise,
                message: 'Updating card'
            };
        }

        function resetCard() {
            vm.card = {};
        }

    }

})();
