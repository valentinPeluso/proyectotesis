(function() {
    'use strict';

    angular.module('app.requirements')
        .controller('requirementsController', requirementsController)

    requirementsController.$inject = ['UIRequerimentService', 'trelloService', 'storageService', '$q', 'jsonFormatterService'];

    function requirementsController(UIRequerimentService, trelloService, storageService, $q, jsonFormatterService) {
        var vm = this;

        var boardSelected = trelloService.boards.getFromSession();

        vm.loading = true;
        
        vm.$onInit = onInit;
        vm.openRequeriment = openRequeriment;

        vm.requerimentList = {};
        onInit();
        function onInit() {
            var promise = trelloService.boards.getLists(boardSelected.id).then(
                function(result) {
                    vm.requerimentList = _.find(result.data, {
                        'name': 'Requeriments'
                    });
                    _.forEach(vm.requerimentList.cards, function(card, index) {
                        card = _.merge(card, jsonFormatterService.stringToJson(card.desc));
                    })
                    console.log();
                    vm.loading = false;
                },
                function(err) {
                    console.log();
                });
    
            vm.promiseLists = {
                promise: promise,
                message: 'Loading requeriments'
            };
        }
        function openRequeriment(requeriment) {
            UIRequerimentService.update(requeriment);
        }
    }

})();
