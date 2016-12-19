(function () {
    'use strict';

    angular.module('app.requirements')
    .controller('requirementsController', requirementsController)
    
    requirementsController.$inject = ['mockedObjectsService', 'UIRequerimentService', 'trelloService', 'storageService', '$q', 'jsonFormatterService'];
    
    function requirementsController(mockedObjectsService, UIRequerimentService, trelloService, storageService, $q, jsonFormatterService){
        var vm = this;
        
        var session = {
            id: 'BoardSelected'
        }
        var boardSelected = storageService.session.get(session);
        
        vm.requeriments = mockedObjectsService.requeriments.getMockedRequeriments();
        
        var promise = trelloService.boards.getLists(boardSelected.id).then(
            function (result) {
                vm.requeriments = _.find(result.data, { 'name': 'Requeriments' });
                _.forEach(vm.requeriments.cards, function (card, index) {
                    card = _.merge(card, jsonFormatterService.stringToJson(card.desc));
                })
                console.log();
            }, function (err) {
                console.log();
            });
        
        vm.promiseLists = {
            promise: promise,
            message: 'Loading requeriments'
        };
        
        vm.saveRequeriment = saveRequeriment;
        vm.openRequeriment = openRequeriment;
        
        function saveRequeriment(requeriment) {
            var card = {
                name: requeriment.title,
                desc: jsonFormatterService.jsonToString(_.omit(requeriment, ['title']))
            };
            
            var deferred = $q.defer();
            
            vm.createCardPromise = {
                promise: deferred.promise,
                message: 'Creating requeriment'
            }
            trelloService.lists.createCard(vm.requeriments.id, card).then(
                function(result) {
                    var cardCreated = result.data;
                    deferred.resolve(cardCreated);
                }, function (err) {
                    console.log();
                })
            deferred.promise.then(
                function (card) {
                    vm.requeriments.cards.push(card);
                }, function (err) {
                    
                });
            
        }
        function openRequeriment(requeriment) {
            UIRequerimentService.open(requeriment);
        }
    }
    
})();