(function() {
    'use strict';

    angular.module('app.components')
        .controller('createRequerimentComponentController', createRequerimentComponentController)

    createRequerimentComponentController.$inject = ['jsonFormatterService', 'trelloService', '$q']

    function createRequerimentComponentController(jsonFormatterService, trelloService, $q) {
        var vm = this;
                
        vm.requerimentList = {};
        vm.possible_dependencies = {};

        vm.$onChanges = onChanges;
        vm.$onInit = onInit;
        vm.saveRequeriment = saveRequeriment;
        vm.resetRequeriment = resetRequeriment;

        function onInit() {
            var promise = trelloService.lists.getList(vm.idRequerimentList).then(
                function(result) {
                    vm.requerimentList = result.data
                    vm.possible_dependencies = vm.requerimentList.cards;
                    console.log();
                },
                function(err) {
                    console.log();
                });

            vm.promiseList = {
                promise: promise,
                message: 'Loading requeriments'
            };
        }
        
        function onChanges(changesObj) {
            if (changesObj.idRequerimentList.currentValue) {
                vm.idRequerimentList = changesObj.idRequerimentList.currentValue;
            };
        };
        function saveRequeriment() {
            vm.requeriment.dependencies = _.map(vm.requeriment.dependencies, 'id');

            var card = {
                name: vm.requeriment.name,
                desc: jsonFormatterService.jsonToString(_.omit(vm.requeriment, ['name']))
            };

            var deferred = $q.defer();

            vm.createRequerimentPromise = {
                promise: deferred.promise,
                message: 'Creating requeriment'
            }
            trelloService.lists.createCard(vm.idRequerimentList, card).then(
                function(result) {
                    var cardCreated = result.data;
                    deferred.resolve(cardCreated);
                },
                function(err) {})
            deferred.promise.then(
                function(card) {
                    location.reload();
                },
                function(err) {
                    location.reload();
                });
        }

        function resetRequeriment() {
            vm.requeriment = {};
        }
    }

})();
