(function () {
    'use strict';

    angular.module('app.configuration')
    .controller('configurationController', configurationController)
    
    configurationController.$inject = ['trelloService'];
    
    function configurationController(trelloService){
        var vm = this;
        
        vm.$onInit = onInit;
        onInit();
        function onInit() {
            trelloService.members.me().then(
                function(result) {
                    console.log();
                }, function(error) {
                    console.log();
                });
        }
       
    };
})();