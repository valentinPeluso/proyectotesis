(function() {
    'use strict';

    angular.module('app.components')
        .controller('updateRequerimentComponentController', updateRequerimentComponentController)

    updateRequerimentComponentController.$inject = ['jsonFormatterService', 'trelloService', '$q']

    function updateRequerimentComponentController(jsonFormatterService, trelloService, $q) {
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

        vm.saveRequeriment = saveRequeriment;

        function saveRequeriment() {
            var updatedRequirement = {
                rason: vm.requeriment.rason,
                origin: vm.requeriment.origin,
                description: vm.requeriment.description,
                priority: vm.requeriment.priority,
                dependencies: _.map(vm.requeriment.dependencies, 'id')
            }
            var requeriment = {
                name: vm.requeriment.name,
                desc: jsonFormatterService.jsonToString(updatedRequirement)
            };

            var promise = trelloService.cards.update(vm.requeriment.id, requeriment).then(
                function(result) {
                    location.reload();
                },
                function(err) {
                    location.reload();
                });

            vm.promise = {
                promise: promise,
                message: 'Updating requeriment'
            }
        }

    }

})();
