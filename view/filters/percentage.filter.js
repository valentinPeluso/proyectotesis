(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('percentage', percentage);

    percentage.$inject = ['$filter'];

    function percentage($filter) {
        var filter = function (input, decimals) {
            return $filter('number')(input, decimals) + '%';
        };

        return filter;
    }
})();