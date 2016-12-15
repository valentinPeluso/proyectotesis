(function () {
    'use strict';

    angular.module('app.board')
    .controller('createBoardController', createBoardController)
    
    createBoardController.$inject = ['trelloService', '$uibModalInstance'];
    
    function createBoardController(trelloService, $uibModalInstance){
        var vm = this;
        
        vm.board = {};
        
        vm.cancel = cancel;
        vm.createBoard = createBoard;
        
        function createBoard() {
            $uibModalInstance.dismiss(vm.board);
        }
        
        function cancel(argument) {
            $uibModalInstance.dismiss('cancel');
        }
    };
})();