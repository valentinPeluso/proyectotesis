(function () {
    'use strict';

    angular.module('app.requirements')
    .controller('requirementsController', requirementsController)
    
    requirementsController.$inject = ['mockedObjectsService', '$uibModal'];
    
    function requirementsController(mockedObjectsService, $uibModal){
        var vm = this;
        
        vm.requeriments = mockedObjectsService.requeriments.getMockedRequeriments();
        
        vm.saveRequeriment = saveRequeriment;
        vm.openRequeriment = openRequeriment;
        
        function saveRequeriment(requeriment) {
            // body...
        }
        function openRequeriment(requeriment) {
            var modalInstance = $uibModal.open({
                animation: true,                
                templateUrl: '/view/requirements/view_requeriment.html',
                controller: 'viewRequerimentController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    requeriment: function () {
                        return requeriment;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                
            }, function () {
                
            });
        }
    }
    
})();