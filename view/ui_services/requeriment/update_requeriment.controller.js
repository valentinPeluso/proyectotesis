(function() {
    'use strict';

    angular.module('app.ui_services')
        .controller('viewUpdateRequerimentController', viewUpdateRequerimentController)

    viewUpdateRequerimentController.$inject = ['requeriment', 'jsonFormatterService', '$uibModalInstance'];

    function viewUpdateRequerimentController(requeriment, jsonFormatterService, $uibModalInstance) {
        var vm = this;

        vm.requeriment = angular.copy(requeriment);
    }

})();
