(function () {
    'use strict';

    angular.module('app.requirements')
    .controller('requirementsController', requirementsController)
    
    requirementsController.$inject = ['mockedObjectsService', 'UIRequerimentService'];
    
    function requirementsController(mockedObjectsService, UIRequerimentService){
        var vm = this;
        
        vm.requeriments = mockedObjectsService.requeriments.getMockedRequeriments();
        
        vm.saveRequeriment = saveRequeriment;
        vm.openRequeriment = openRequeriment;
        
        function saveRequeriment(requeriment) {
            // body...
        }
        function openRequeriment(requeriment) {
            UIRequerimentService.open(requeriment);
        }
    }
    
})();