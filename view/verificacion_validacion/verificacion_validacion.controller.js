(function () {
    'use strict';

    angular.module('app.verificacion_validacion')
    .controller('verificacionValidacionController', verificacionValidacionController)
    
    verificacionValidacionController.$inject = ['pullRequestService'];
    
    function verificacionValidacionController(pullRequestService){
        var vm = this;
        
        console.log(pullRequestService.get());
    }
    
})();