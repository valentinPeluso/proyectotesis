(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller('viewRequerimentController', viewRequerimentController)

    viewRequerimentController.$inject = ['requeriment', 'jsonFormatterService', '$uibModalInstance'];

    function viewRequerimentController(requeriment, jsonFormatterService, $uibModalInstance) {
        var vm = this;

        vm.requeriment = angular.copy(requeriment);
    }

})();
