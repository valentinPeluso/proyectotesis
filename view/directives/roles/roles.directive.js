(function() {
    'use strict';

    /* global angular */

    angular
        .module('app.directives')
        .directive('tgRoles', roles);

    roles.$inject = ['sessionService'];

    function roles(sessionService) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, element, attrs, controller, transcludeFn) {
            var roles = attrs.tgRoles.split(',');
            var authorized = sessionService.checkPermission(roles);
            if (!authorized) {
                element.html('');
            }
        }
    }

})();
