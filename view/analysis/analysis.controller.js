(function () {
    'use strict';

    angular.module('app.analysis')
    .controller('analysisController', analysisController)
    
    analysisController.$inject = ['trelloService', 'UICardService', 'UIRequerimentService', 'storageService', 'jsonFormatterService'];
    
    function analysisController(trelloService, UICardService, UIRequerimentService, storageService, jsonFormatterService){
        var vm = this;
        
        var session = {
            id: 'BoardSelected'
        }
        var boardSelected = storageService.session.get(session);
        
        vm.requeriments = [];
        
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
        
        vm.openRequeriment = openRequeriment;
        
        function openRequeriment(requeriment) {
            UIRequerimentService.open(requeriment);
        }
    }
    
})();