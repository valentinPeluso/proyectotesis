(function() {
    'use strict';

    angular.module('app.components')
        .controller('createCardComponentController', createCardComponentController)

    createCardComponentController.$inject = ['trelloService', '$q', 'jsonFormatterService']

    function createCardComponentController(trelloService, $q, jsonFormatterService) {
        var vm = this;

        vm.card = {};
        vm.possible_assignees = [];
        vm.possible_reporter = [];
        vm.possible_issue_links = [];
        vm.possible_labels = [];

        vm.saveCard = saveCard;
        vm.resetCard = resetCard;

        var boardSelected = trelloService.boards.getFromSession();

        var promise = $q.all([
            trelloService.boards.getMembers(boardSelected.id),
            trelloService.lists.getList(vm.idBacklogList),
            trelloService.boards.getStates(boardSelected.id),
        ]).then(
            function(result) {
                vm.members = result[0].data;
                vm.possible_assignees = vm.members;
                vm.possible_reporter = angular.copy(vm.members);
                vm.backlogCards = result[1].data.cards;
                vm.possible_issue_links = vm.backlogCards;
                vm.newCardState = _.find(result[2].data, {
                    name: "Not started"
                });
            },
            function(err) {
                console.log();
            });

        vm.promise = {
            promise: promise,
            message: 'Loading'
        };

        function saveCard() {
            vm.card.assignee = _.map(vm.card.assignee, 'id');
            vm.card.reporter = _.map(vm.card.reporter, 'id');
            vm.card.issue_links = _.map(vm.card.issue_links, 'id');
            vm.card.labels = _.map(vm.card.labels, 'id');
            vm.card.state = [vm.newCardState.id];
            vm.card.idRequeriment = vm.idRequeriment;

            var deferred = $q.defer();

            vm.promise = {
                promise: deferred.promise,
                message: 'Creating card'
            };

            var card = {
                name: vm.card.name,
                desc: jsonFormatterService.jsonToString(_.omit(vm.card, ['name'])),
                idMembers: vm.card.assignee
            };

            trelloService.lists.createCard(vm.idBacklogList, card).then(
                function(result) {
                    var cardCreated = result.data;
                    var body = {
                        value: vm.newCardState.id
                    }
                    trelloService.cards.assigneeState(
                        cardCreated.id,
                        body
                    ).then(function(result) {
                        deferred.resolve();
                        debugger;
                    }, function(err) {});
                },
                function(err) {});


        }

        function resetCard() {
            vm.card = {};
        }

    }

})();
