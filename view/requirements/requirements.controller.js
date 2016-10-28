(function () {
    'use strict';

    angular.module('app.requirements')
    .controller('requirementsController', requirementsController)
    
    requirementsController.$inject = ['pullRequestService'];
    
    function requirementsController(pullRequestService){
        var vm = this;
        
        console.log(pullRequestService.get());
    }
    
})();