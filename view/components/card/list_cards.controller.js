(function() {
    'use strict';

    angular.module('app.components')
        .controller('listCardsComponentController', listCardsComponentController)

    listCardsComponentController.$inject = ['trelloService', '$q', 'jsonFormatterService']

    function listCardsComponentController(trelloService, $q, jsonFormatterService) {
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
                debugger;
            },
            function(err) {
                console.log();
            });

        vm.openCard = openCard;
        vm.removeCard = removeCard;

        function openCard(card) {
            //UICardService.open(card);
        };

        function removeCard(cards, index) {
            cards.splice(index, 1);
        }

    }

})();
