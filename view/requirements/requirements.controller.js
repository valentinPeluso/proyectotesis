(function () {
    'use strict';

    angular.module('app.requirements')
    .controller('requirementsController', requirementsController)
    
    requirementsController.$inject = ['mockedObjectsService'];
    
    function requirementsController(mockedObjectsService){
        var vm = this;
        
        console.log(mockedObjectsService.pull_requests.getMockedPullRequests());
    }
    
})();