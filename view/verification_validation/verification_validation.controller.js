(function () {
    'use strict';

    angular.module('app.verification_validation')
    .controller('verificationValidationController', verificationValidationController)
    
    verificationValidationController.$inject = ['pullRequestService', 'UICardService'];
    
    function verificationValidationController(pullRequestService, UICardService){
        var vm = this;
        
        vm.openCard = openCard;

        console.log(pullRequestService.get());
        //-----MOCKS-------
        vm.cards = UICardService.getMokedCards();

        function openCard(card) {
            UICardService.open(card);
        };
    };
})();