(function () {
    'use strict';

    angular.module('app.login')
    .controller('loginController', loginController)
    
    loginController.$inject = ['loginService'];
    
    function loginController(loginService){
        var vm = this;
        
        vm.loginWithGithub = loginWithGithub;
        vm.loginWithTrello = loginWithTrello;
        
        function loginWithTrello(argument) {
            loginService.loginWithTrello();
        }
        function loginWithGithub(argument) {
             //loginService.loginWithGithub();
        }
    }
    
})();