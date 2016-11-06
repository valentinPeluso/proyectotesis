 (function () {
    'use strict';

    angular
        .module('app.services')
        .factory('sessionService', sessionService);

    sessionService.$inject = ['mockedObjectsService']

    function sessionService(mockedObjectsService) {
        var service = {
            getUserLogued: getUserLogued,
            checkRoutePermission: checkRoutePermission
        };

        return service;   

        function getUserLogued() {
            return mockedObjectsService.users.getUserLogued();
        }
        function checkRoutePermission(currentRoute) {
            var user_logued = this.getUserLogued();
            return _.some(
                        _.map(user_logued.roles, 'role'), 
                        function(role) {
                            return _.includes(currentRoute.roles, role)
                        }
                    );
        }        
    }

})();