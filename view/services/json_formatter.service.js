(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('jsonFormatterService', jsonFormatterService);

    jsonFormatterService.$inject = []

    function jsonFormatterService(mockedObjectsService, $location) {
        var service = {
            stringToJson: stringToJson,
            jsonToString: jsonToString
        };

        return service;   

        function stringToJson(string) {
            var json = {};
            var array = _.chunk(_.drop(_.split(string, '**')), 2);
            _.forEach(array, function(element, index){
                var key = _.split(element[0], ':')[0],
                    value = _.startCase(_.replace(element[1], '\n', ''));
                json = _.merge(json, {
                   [key] : value
                });
            })
            return json;
        }
        function jsonToString(json) {
            var string = "";
            _.forEach(json, function(value, key) {
                string = string + '**' + key + ':** '+ value + '\n';
            });
            return string;
        }  
    }

})();