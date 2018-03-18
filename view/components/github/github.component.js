(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgGithub', {
            templateUrl: '/proyectotesis/view/components/github/github.html',
            controller: githubController,
            // bindings: {
            //     card: '<',
            //     save: '&'
            // }
        });
        
    githubController.$inject = ['mockedObjectsService', '$location']    

    function githubController(mockedObjectsService, $location) {
        var vm = this;
        
        vm.location = "/"+_.words($location.$$path)[0];
        
        
    }

})();