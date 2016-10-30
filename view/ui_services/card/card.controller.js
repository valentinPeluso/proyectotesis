(function () {
    'use strict';

    angular.module('app.ui_services')
    .controller('viewCardController', viewCardController)
    
    viewCardController.$inject = ['card', 'statesService'];
    
    function viewCardController(card, statesService){
        var vm = this;
        
        vm.possible_issue_links = [
            { id: 1, description: 'Title of card linked one'},
            { id: 2, description: 'Title of card linked two'},
            { id: 3, description: 'Title of card linked three'},
            { id: 4, description: 'Title of card linked fout'},
        ];
        vm.possible_assignees = [
            { id: 1, user: 'Valentin'},
            { id: 2, user: 'Matias'},
            { id: 3, user: 'Cristian'},
            { id: 4, user: 'Tebi'},
        ];

        vm.states = statesService.get();
        
        vm.card = angular.copy(card);       
        vm.card.state = _.find(vm.states, { 'id' : card.state});
       
        console.log(vm.card);
    };
})();