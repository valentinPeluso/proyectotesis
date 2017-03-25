(function() {
    'use strict';

    angular.module('app.analysis')
        .controller('analysisController', analysisController)

    analysisController.$inject = [
        'trelloService',
        'UICardService',
        'UIRequerimentService',
        'storageService',
        'jsonFormatterService',
        '$q'
    ];

    function analysisController(
        trelloService,
        UICardService,
        UIRequerimentService,
        storageService,
        jsonFormatterService,
        $q
    ) {
        var vm = this;

        var session = {
            id: 'BoardSelected'
        }
        var boardSelected = storageService.session.get(session);

        vm.requeriments = [];

        var promise = $q.all(
            [
                trelloService.boards.getLists(boardSelected.id),
                trelloService.boards.getCards(boardSelected.id)
            ]
        ).then(
            function(result) {

                vm.requerimentList = _.find(result[0].data, {
                    'name': 'Requeriments'
                });

                vm.backlogList = _.find(result[0].data, {
                    'name': 'Backlog'
                });

                vm.attachmentsList = _.find(result[0].data, {
                    'name': 'Attachments'
                });

                vm.cards = _.filter(
                    result[1].data,
                    function(card) {
                        return card.idList !== vm.requerimentList.id;
                    }
                );

                _.forEach(vm.cards, function(card) {
                    card = _.merge(
                        card,
                        jsonFormatterService.stringToJson(card.desc)
                    );
                });

                _.forEach(vm.backlogList.cards, function(card) {
                    card = _.merge(
                        card,
                        jsonFormatterService.stringToJson(card.desc)
                    );
                });

                var possible_dependencies =
                    angular.copy(vm.requerimentList.cards);

                _.forEach(vm.requerimentList.cards, function(card, index) {
                    card = _.merge(
                        card,
                        jsonFormatterService.stringToJson(card.desc)
                    );

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
                    card.cardsCreatedFromRequeriment = _.filter(vm.cards, {
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
