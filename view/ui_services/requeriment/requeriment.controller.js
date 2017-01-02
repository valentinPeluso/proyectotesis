(function () {
    'use strict';

    angular.module('app.ui_services')
    .controller('viewRequerimentController', viewRequerimentController)
    
    viewRequerimentController.$inject = ['requeriment', 'jsonFormatterService', '$uibModalInstance'];
    
    function viewRequerimentController(requeriment, jsonFormatterService, $uibModalInstance){
        var vm = this;
        
        vm.requeriment = angular.copy(requeriment);
        
        vm.updateRequeriment = updateRequeriment;
        
        function updateRequeriment(requeriment) {
            var updatedRequirement = {
                rason: requeriment.rason,
                origin: requeriment.origin,
                description: requeriment.description,
                priority: requeriment.priority,
            }
            var card = {
                name: requeriment.name,
                desc: jsonFormatterService.jsonToString(updatedRequirement)
            };
            $uibModalInstance.close(card);
        }
    }

})();