(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgTimeline', {
            templateUrl: '/view/components/timeline/timeline.html',
            controller: timelineComponentController,
            bindings: {
                id: '<',
                conversation: '<',
                commits: '<',
                filesChanged: '<'
            }
        });
        
    timelineComponentController.$inject = []    

    function timelineComponentController() {
        var vm = this;
        
        console.log(vm.id);
    }

})();