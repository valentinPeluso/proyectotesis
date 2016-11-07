(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgRequeriment', {
            templateUrl: '/view/components/requeriment/requeriment.html',
            controller: requerimentComponentController,
            bindings: {
                save: '&',
                requeriment: '<'
            }
        });
        
    requerimentComponentController.$inject = ['mockedObjectsService']    

    function requerimentComponentController(mockedObjectsService) {
        var vm = this;
        
        vm.possible_dependencies = mockedObjectsService.requeriments.getMockedRequeriments();
        
        vm.saveRequeriment = saveRequeriment;
        vm.resetRequeriment = resetRequeriment;
        
        function saveRequeriment() {
            vm.save({ 'requeriment' : vm.requeriment });
        }
        function resetRequeriment() {
            vm.requeriment = {};
        }
    }

})();