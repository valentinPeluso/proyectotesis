(function () {
    'use strict';

    angular.module('app.requirements')
    .controller('viewRequerimentController', viewRequerimentController)
    
    viewRequerimentController.$inject = ['requeriment'];
    
    function viewRequerimentController(requeriment){
        var vm = this;
        
        vm.requeriment = angular.copy(requeriment);
        
        vm.updateRequeriment = updateRequeriment;
        
        function updateRequeriment(requeriment) {
            
        }
       
    }
    
})();