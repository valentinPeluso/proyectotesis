(function () {
    'use strict';

    angular.module('app.verification_validation')
    .controller('verificationValidationController', verificationValidationController)
    
    verificationValidationController.$inject = ['mockedObjectsService', 'UICardService'];
    
    function verificationValidationController(mockedObjectsService, UICardService){
        var vm = this;
        
    };
})();