(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('focusElement', focusElement);
    
    function focusElement($timeout) {
        var directive = {
            link: link,
        }

        return directive;

        function link(scope, element, attrs) {
            scope.$watch(attrs.focusElement, function (value) {
                if (value === true) {
                    $timeout(function() {
                        element[0].focus();
                        scope[attrs.focusMe] = false;
                    },100);
                }
            });
        }
    }

})();