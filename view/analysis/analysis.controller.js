(function () {
    'use strict';

    angular.module('app.analysis')
    .controller('analysisController', analysisController)
    
    analysisController.$inject = ['mockedObjectsService', 'UICardService', 'UIRequerimentService'];
    
    function analysisController(mockedObjectsService, UICardService, UIRequerimentService){
        var vm = this;
        
        vm.requeriments = mockedObjectsService.requeriments.getMockedRequeriments();
        
        vm.openRequeriment = openRequeriment;
        
        function openRequeriment(requeriment) {
            UIRequerimentService.open(requeriment);
        }
    }
    
})();