(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgPanel', {
            templateUrl: '/view/components/panel/panel.html',
            controller: panelComponentController,
            bindings: {
                type: '<',
                icon: '<',
                quantityCards: '<',
                hugeTitle: '<',
                largeTitle: '<',
                mediumTitle: '<',
                lastTitle: '<',
                onClick: '&',
                itemParam: '<'
            }
        });

    panelComponentController.$inject = ['$sce']

    function panelComponentController($sce) {
        var vm = this;

        vm.click = function() {
            vm.onClick({
                item: vm.itemParam
            });
        }
    }

})();
