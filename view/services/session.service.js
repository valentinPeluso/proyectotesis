(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('sessionService', sessionService);

    sessionService.$inject = ['mockedObjectsService', '$location']

    function sessionService(mockedObjectsService, $location) {
        var service = {
            getUserLogued: getUserLogued,
            checkRoutePermission: checkRoutePermission,
            checkPermission: checkPermission
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
        function checkPermission(roles) {
            var user_logued = this.getUserLogued();
            return _.some(
                        _.map(user_logued.roles, 'role'), 
                        function(role) {
                            return _.includes(roles, role)
                        }
                    );
        }        
    }

})();