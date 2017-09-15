(function() {
    'use strict';

    /* global _ */
    /* global angular */

    angular
        .module('app.services')
        .factory('sessionService', sessionService);

    sessionService.$inject = ['trelloService', '$location'];

    function sessionService(trelloService, $location) {
        var service = {
            checkRoutePermission: checkRoutePermission,
            checkPermission: checkPermission
        };

        return service;

        function checkRoutePermission(currentRoute) {
            var userLogged = trelloService.user.getFromSession();
            var boardTeams = trelloService.boards.getUsersFromSession();
            var boardUsers = _.flatten(_.map(boardTeams, 'users'));
            var userLoggedWithRoles = null;
            if (typeof boardUsers !== 'undefined' &&
                boardUsers !== null
            ) {
                userLoggedWithRoles = _.find(boardUsers, {
                    id: userLogged.id
                });
                userLogged = _.merge(userLogged, userLoggedWithRoles);
                return _.some(
                    _.map(userLogged.roles, 'id'),
                    function(role) {
                        return _.includes(currentRoute.roles, role);
                    }
                );
            }
            else {
                return false;
            }

        }

        function checkPermission(roles) {
            var userLogged = trelloService.user.getFromSession();
            var boardTeams = trelloService.boards.getUsersFromSession();
            var boardUsers = _.flatten(_.map(boardTeams, 'users'));
            var userLoggedWithRoles = null;
            if (typeof boardUsers !== 'undefined' &&
                boardUsers !== null
            ) {
                userLoggedWithRoles = _.find(boardUsers, {
                    id: userLogged.id
                });
                userLogged = _.merge(userLogged, userLoggedWithRoles);
                return _.some(
                    _.map(userLogged.roles, 'id'),
                    function(role) {
                        return _.includes(roles, role);
                    }
                );
            }
            else {
                return false;
            }
        }
    }

})();
