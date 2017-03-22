(function() {
    'use strict';

    angular.module('app.components')
        .controller('listCardsComponentController', listCardsComponentController)

    listCardsComponentController.$inject = ['trelloService', '$q', 'jsonFormatterService', 'UICardService']

    function listCardsComponentController(trelloService, $q, jsonFormatterService, UICardService) {
        var vm = this;

        vm.cards = [];

        var boardSelected = trelloService.boards.getFromSession();

        var promise = $q.all([
            trelloService.lists.getList(vm.idList),
            trelloService.boards.getMembers(boardSelected.id)
        ]).then(
            function(result) {
                vm.cards = result[0].data.cards;
                vm.members = result[1].data;
                _.forEach(vm.cards, function(card) {
                    card = _.merge(card, jsonFormatterService.stringToJson(card.desc));
                    card.idList = vm.idList;
                    var assignees = [];
                    _.forEach(card.assignee, function(idMember) {
                        assignees.push(_.find(vm.members, {
                            id: idMember
                        }));
                    });
                    card.assignee = assignees;
                });
                // Si 
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
        })

        vm.openCard = openCard;
        vm.removeCard = removeCard;

        function openCard(card) {
            UICardService.updateCard(card.id, card.name);
        };

        function removeCard(cards, index, card) {
            cards.splice(index, 1);
            debugger;
        }

    }

})();
