(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgRequeriment', {
            templateUrl: '/view/components/requeriment/requeriment.html',
            controller: requerimentComponentController,
            bindings: {
                save: '&',
                requeriment: '<',
            }
        });
        
    requerimentComponentController.$inject = ['mockedObjectsService', 'sessionService']    

    function requerimentComponentController(mockedObjectsService, sessionService) {
        var vm = this;
        
        vm.haveRol = haveRol;
        
        if (vm.haveRol('Requeriment')) {
            vm.possible_dependencies = mockedObjectsService.requeriments.getMockedRequeriments();
        
            vm.saveRequeriment = saveRequeriment;
            vm.resetRequeriment = resetRequeriment;
            
            function saveRequeriment() {
                vm.save({ 'requeriment' : vm.requeriment });
            }
            function resetRequeriment() {
                vm.requeriment = {};
            }
        } else if (vm.haveRol('Analysis')) {
            vm.saveCard = saveCard;
            
            vm.possible_assigness = mockedObjectsService.cards.getMockedPossibleAssigness();
            
            vm.cards = mockedObjectsService.cards.getMokedCards();
             _.forEach(vm.cards, function(card, index) {
                card.assignee = _.find(vm.possible_assigness, { id : card.assignee});
            });
            
            function saveCard(card) {
                
            }
        }
        
        function haveRol(roles) {
            return sessionService.checkPermission(roles);
        }
        
    }

})();