(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgNav', {
            templateUrl: '/view/components/nav/nav.html',
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
            vm.active = "/" + _.words($location.$$path)[0];
        }

        function changeOfLocation(location) {
            vm.active = location;
        }

    }

})();
