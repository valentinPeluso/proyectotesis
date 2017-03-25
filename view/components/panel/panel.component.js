(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgPanel', {
            templateUrl: '/view/components/panel/panel.html',
            controller: panelComponentController,
            bindings: {
                list: '<',
                allowMoveCard: '<',
                type: '<' // REQUERIMENT | CARD
            }
        });

    panelComponentController.$inject = [
        '$sce',
        'trelloService',
        'jsonFormatterService'
    ];

    function panelComponentController(
        $sce,
        trelloService,
        jsonFormatterService
    ) {
        var vm = this;

        var boardSelected = trelloService.boards.getFromSession();
        var boardStates = trelloService.boards.getStatesFromSession();

        vm.inserted = function(index, item, external, type) {
            var body = {
                value: vm.list.id
            }
            vm.list.opened = false;
            var promise = trelloService.cards.moveCard(
                item.id,
                body
            ).then(
                function(result) {
                    var card = jsonFormatterService.stringToJson(result.data.desc);
                    vm.list.points_to_do = _.sum(
                        [
                            card.points,
                            vm.list.points_to_do
                        ]
                    );
                    vm.list.points_made = 0;
                    vm.list.id = result.data.idList;
                    vm.list.opened = true;
                },
                function(err) {
                    debugger;
                });
            vm.promise = {
                promise: promise,
                message: 'Loading'
            };
        };

        vm.click = click;
        vm.onRemove = onRemove;
        vm.onOpen = onOpen;

        function click() {
            vm.list.opened = !vm.list.opened;
        }

        function onOpen(promise) {
            vm.promise = promise;
        }

        function onRemove(card) {
            vm.list.points_to_do = _.subtract(vm.list.points_to_do, card.points);
        }
    }

})();
