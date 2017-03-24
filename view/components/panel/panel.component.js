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

    panelComponentController.$inject = ['$sce', 'trelloService']

    function panelComponentController($sce, trelloService) {
        var vm = this;

        vm.inserted = function(index, item, external, type) {
            var body = {
                value: vm.list.id
            }
            var promise = trelloService.cards.moveCard(
                item.id,
                body
            ).then(
                function(result) {
                    debugger;
                },
                function(err) {
                    debugger;
                });
            vm.promise = {
                promise: promise,
                message: 'Loading'
            };
        };

        vm.click = function() {
            vm.list.opened = !vm.list.opened;
        }

        vm.onOpen = function(promise) {
            vm.promise = promise;
        }
    }

})();
