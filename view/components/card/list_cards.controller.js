(function() {
    'use strict';

    angular.module('app.components')
        .controller('listCardsComponentController', listCardsComponentController)

    listCardsComponentController.$inject = [
        'trelloService',
        '$q',
        'jsonFormatterService',
        'UICardService',
        'UIRequerimentService'
    ];

    function listCardsComponentController(
        trelloService,
        $q,
        jsonFormatterService,
        UICardService,
        UIRequerimentService
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
                trelloService.boards.getMembers(boardSelected.id)
            ]).then(
                function(result) {
                    vm.cards = result[0].data.cards;
                    vm.members = result[1].data;
                    vm.states = boardStates;
                    _.forEach(
                        vm.cards,
                        function(card) {
                            card = _.merge(
                                card,
                                jsonFormatterService.stringToJson(card.desc)
                            );
                            card.idList = vm.idList;
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
                                _.forEach(card.assignee, function(idMember) {
                                    assignees.push(_.find(vm.members, {
                                        id: idMember
                                    }));
                                });
                                card.assignee = assignees;
                            }
                        }
                    );
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
            });
        }

        function openCard(card) {
            switch (vm.type) {
                case "CARD":
                    UICardService.updateCard(card.id, card.name);
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

        activate();

    }

})();
