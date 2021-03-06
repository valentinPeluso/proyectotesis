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

        vm.saveCard = saveCard;
        vm.resetCard = resetCard;
        vm.$onInit = onInit;

        var boardSelected = trelloService.boards.getFromSession();
        var boardStates = trelloService.boards.getStatesFromSession();

        function onInit() {
            var promise = $q.all([
                trelloService.boards.getMembers(boardSelected.id),
                trelloService.lists.getList(vm.idBacklogList),
                trelloService.lists.getList(vm.idAttachmentList),
            ]).then(
                function(result) {
                    vm.members = result[0].data;
                    vm.possible_assignees = vm.members;
                    vm.possible_reporter = angular.copy(vm.members);
                    vm.backlogCards = result[1].data.cards;
                    vm.attachmentCards = result[2].data.cards;
                    vm.possible_issue_links = vm.backlogCards;
                    vm.newCardState = _.find(boardStates, {
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
        }
        function saveCard() {
            vm.card.assignee = _.map(vm.card.assignee, 'id');
            vm.card.reporter = _.map(vm.card.reporter, 'id');
            vm.card.issue_links = _.map(vm.card.issue_links, 'id');
            vm.card.wikis = _.map(vm.card.wikis, 'id');
            vm.card.states = [
                vm.newCardState.id
            ];
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
