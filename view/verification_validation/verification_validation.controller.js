(function () {
    'use strict';

    angular.module('app.verification_validation')
    .controller('verificationValidationController', verificationValidationController)
    
    verificationValidationController.$inject = ['pullRequestService'];
    
    function verificationValidationController(pullRequestService){
        var vm = this;
        
        console.log(pullRequestService.get());
    }
    
})();