(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('jsonFormatterService', jsonFormatterService);

    jsonFormatterService.$inject = ['$filter'];

    function jsonFormatterService($filter) {
        var service = {
            stringToJson: stringToJson,
            jsonToString: jsonToString,
            getDescForClosedCard: getDescForClosedCard
        };

        return service;

        function stringToJson(string) {
            var json = {};
            var array = _.chunk(_.drop(_.split(string, '**')), 2);
            _.forEach(array, function(element, index) {
                var key = _.split(element[0], ':')[0],
                    value;

                try {
                    value = angular.fromJson(element[1]);
                }
                catch (err) {
                    value = _.startCase(_.replace(element[1], '\n', ''));
                    if (!isNaN(parseInt(value))) {
                        value = parseInt(value);
                    }
                }
                json = _.merge(json, {
                    [key]: value
                });
            })
            return json;
        }

        function jsonToString(json) {
            var string = "";
            _.forEach(json, function(value, key) {
                string = string + '**' + key + ':** ' + angular.toJson(value) + '\n';
            });
            return string;
        }

        function getDescForClosedCard(card) {
            var string = "The card " + card.name +
                " with description (" + card.description + "), " +
                " priority " + card.priority +
                " pointed as " + card.points +
                " was merged at " +
                $filter('date')(card.pullRequest.merged_at, 'dd/MM/yyyy HH:mm') +
                "." +
                " This card was developed for " + card.assignee[0].fullName + "." +
                '\n';
            return string;
        }
    }

})();
