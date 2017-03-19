(function() {
    'use strict';

    angular.module('app.components')
        .controller('detailRequerimentComponentController', detailRequerimentComponentController)

    detailRequerimentComponentController.$inject = ['$q', '$location', 'jsonFormatterService', 'trelloService']

    function detailRequerimentComponentController($q, $location, jsonFormatterService, trelloService) {
        var vm = this;

        var promise = $q.all([
            trelloService.cards.getCard(vm.idRequeriment),
            trelloService.lists.getList(vm.idRequerimentList)
        ]).then(
            function(result) {
                vm.requeriment = result[0].data;
                vm.requeriment = _.merge(vm.requeriment, jsonFormatterService.stringToJson(vm.requeriment.desc));
                vm.requerimentList = result[1].data
                vm.possible_dependencies = vm.requerimentList.cards;
                var dependencies = [];
                _.forEach(vm.requeriment.dependencies, function(idDependencie) {
                    dependencies.push(
                        _.merge(
                            _.find(
                                vm.possible_dependencies, {
                                    id: idDependencie
                                }
                            ), {
                                selected: true
                            }
                        )
                    );
                });
                vm.requeriment.dependencies = dependencies;
            },
            function(err) {
                console.log();
            });

        vm.promise = {
            promise: promise,
            message: 'Loading requeriment'
        };

    }

})();
