(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgPanel', {
            templateUrl: '/proyectotesis/view/components/panel/panel.html',
            controller: panelComponentController,
            bindings: {
                type: '@',
                icon: '@',
                quantityCards: '<',
                hugeTitle: '<',
                largeTitle: '<',
                mediumTitle: '<',
                lastTitle: '<',
                onClick: '&',
                itemParam: '<'
            }
        });
        
    panelComponentController.$inject = []    

    function panelComponentController() {
        var vm = this;
        
        vm.click = function() {
            vm.onClick({ item : vm.itemParam});
        }
    }

})();