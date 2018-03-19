(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgNav', {
            templateUrl: '/proyectotesis/view/components/nav/nav.html',
            controller: navComponentController,
            bindings: {}
        });

    navComponentController.$inject = [
        '$location'
    ]

    function navComponentController(
        $location
    ) {
        var vm = this;

        vm.changeOfLocation = changeOfLocation;

        activate();

        function activate(argument) {
            vm.active = $location.path();
        }

        function changeOfLocation(location) {
            vm.active = location;
        }

    }

})();
