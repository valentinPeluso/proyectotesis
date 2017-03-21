(function() {
    'use strict';

    angular.module('app.analysis')
        .controller('analysisController', analysisController)

    analysisController.$inject = ['trelloService', 'UICardService', 'UIRequerimentService', 'storageService', 'jsonFormatterService'];

    function analysisController(trelloService, UICardService, UIRequerimentService, storageService, jsonFormatterService) {
        var vm = this;

        var session = {
            id: 'BoardSelected'
        }
        var boardSelected = storageService.session.get(session);

        vm.requeriments = [];

        var promise = trelloService.boards.getLists(boardSelected.id).then(
            function(result) {

                vm.requerimentList = _.find(result.data, {
                    'name': 'Requeriments'
                });

                vm.backlogList = _.find(result.data, {
                    'name': 'Backlog'
                });

                _.forEach(vm.backlogList.cards, function(card) {
                    card = _.merge(card, jsonFormatterService.stringToJson(card.desc));
                });

                var possible_dependencies = angular.copy(vm.requerimentList.cards);

                _.forEach(vm.requerimentList.cards, function(card, index) {
                    card = _.merge(card, jsonFormatterService.stringToJson(card.desc));

                    var dependencies = [];
                    _.forEach(card.dependencies, function(idDependencie) {
                        dependencies.push(
                            _.pick(
                                _.find(
                                    possible_dependencies, {
                                        id: idDependencie
                                    }
                                ), [
                                    'id',
                                    'name'
                                ]
                            )
                        );
                        card.dependencies = dependencies;
                    });
                    card.cardsCreatedFromRequeriment = _.filter(vm.backlogList.cards, {
                        idRequeriment: card.id
                    });

                });
            },
            function(err) {

            });

        vm.promiseLists = {
            promise: promise,
            message: 'Loading requeriments'
        };

        vm.openRequeriment = openRequeriment;

        function openRequeriment(requeriment) {
            UIRequerimentService.createCardsFromRequeriment(requeriment, vm.backlogList.id);
        }
    }

})();
