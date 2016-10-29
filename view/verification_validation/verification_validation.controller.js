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
        vm.cards = [
            {
                id: "123",
                title: "Title of Card 1",
                points: 3,
                assignee: {
                    id: 1,
                    user: "Valentin"
                },
                pull_request_linked: true,
                comments: 5
            },
            {
                id: "231",
                title: "Title of Card 2",
                points: 1,
                assignee: {
                    id: 1,
                    user: "Pedro"
                },
                pull_request_linked: false,
                comments: 2
            },
        ];

        function openCard(card) {
            UICardService.open(card);
        };
    };
})();