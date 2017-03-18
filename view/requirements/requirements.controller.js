(function() {
    'use strict';

    angular.module('app.requirements')
        .controller('requirementsController', requirementsController)

    requirementsController.$inject = ['mockedObjectsService', 'UIRequerimentService', 'trelloService', 'storageService', '$q', 'jsonFormatterService'];

    function requirementsController(mockedObjectsService, UIRequerimentService, trelloService, storageService, $q, jsonFormatterService) {
        var vm = this;

        var boardSelected = trelloService.boards.getFromSession();

        vm.requerimentList = {};

        var promise = trelloService.boards.getLists(boardSelected.id).then(
            function(result) {
                vm.requerimentList = _.find(result.data, {
                    'name': 'Requeriments'
                });
                _.forEach(vm.requerimentList.cards, function(card, index) {
                    card = _.merge(card, jsonFormatterService.stringToJson(card.desc));
                })
                console.log();
            },
            function(err) {
                console.log();
            });

        vm.promiseLists = {
            promise: promise,
            message: 'Loading requeriments'
        };

        vm.openRequeriment = openRequeriment;

        function openRequeriment(requeriment) {
            UIRequerimentService.open(requeriment).then(
                function(requirementUpdated) {
                    // var promise = trelloService.cards.update(requeriment.id, requirementUpdated).then(
                            //     function(result) {
                            //         var card = _.merge(result.data, jsonFormatterService.stringToJson(result.data.desc));
                            //         var pos = _.findIndex(vm.requerimentList.cards, {
                            //             'id': card.id
                            //         });
                            //         vm.requerimentList.cards[pos] = card;
                            //     },
                            //     function(err) {
                    
                            //     });
                    
                            // vm.updateRequerimentPromise = {
                            //     promise: promise,
                            //     message: 'Updating requeriment'
                            // }
                },
                function() {

                });
        }
    }

})();
