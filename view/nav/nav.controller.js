(function () {
    'use strict';

    angular.module('app.nav')
    .controller('navController', navController)
    
    navController.$inject = ['$location'];
    
    function navController($location){
        var vm = this;

        vm.turnos = {}
        
        vm.changeOfLocation = changeOfLocation;
        
        activate();
         
        function activate(argument) {
            vm.active = "/"+_.words($location.$$path)[0];            
         }
         
         function changeOfLocation(location) {
             vm.active = location;            
         }
        
    }
    
})();