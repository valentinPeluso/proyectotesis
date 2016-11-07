(function () {
    'use strict';

    angular.module('app')
    .controller('loginController', loginController)
    
    loginController.$inject = ['loginService'];
    
    function loginController(loginService){
        var vm = this;
        
        console.log("Login");
        
        vm.loginWithGithub = loginWithGithub;
        vm.loginWithTrello = loginWithTrello;
        
        function loginWithTrello(argument) {
            loginService.loginWithTrello().then(
                function(data, status){
                    console.log();
                }, function(error){
                    console.log();
                })
        }
        function loginWithGithub(argument) {
            // body...
        }
    }
    
})();