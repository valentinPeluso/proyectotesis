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
            trelloService.lists.getList(vm.idBacklogList)
        ]).then(
            function(result) {
                vm.members = result[0].data;
                vm.possible_assignees = vm.members;
                vm.possible_reporter = angular.copy(vm.members);
                vm.backlogCards = result[1].data.cards;
                vm.possible_issue_links = vm.backlogCards;
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
            vm.card.idRequeriment = vm.idRequeriment;

            var card = {
                name: vm.card.name,
                desc: jsonFormatterService.jsonToString(_.omit(vm.card, ['name'])),
                idMembers: vm.card.assignee
            };

            var promise = trelloService.lists.createCard(vm.idBacklogList, card).then(
                function(result) {
                    var cardCreated = result.data;
                    vm.card = {};
                },
                function(err) {});

            vm.promise = {
                promise: promise,
                message: 'Creating card'
            };
        }

        function resetCard() {
            vm.card = {};
        }

    }

})();
