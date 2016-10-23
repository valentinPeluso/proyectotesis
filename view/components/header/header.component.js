(function() {
    'use strict';

    angular
        .module('app.components')
        .component('headerComponent', {
            templateUrl: '../project/components/header/header.html?v=13',
            controller: headerComponentController,
            bindings: {
                headerTitle: '<',
            }
        });
        
    headerComponentController.$inject = ['buscadorService']    

    function headerComponentController(buscadorService) {
        var vm = this;
        
        vm.filtro = '';
        vm.mostrarBuscador = false;
        
        vm.filtrar = filtrar;
        
        filtrar();
        
        function filtrar() {
            buscadorService.post(vm.filtro);
        }

    }

})();