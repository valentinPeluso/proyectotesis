(function() {
    'use strict';

    angular.module('app.board')
        .controller('boardController', boardController)

    boardController.$inject = ['trelloService', '$uibModal', '$location'];

    function boardController(trelloService, $uibModal, $location) {
        var vm = this;

        vm.boards = [];

        vm.selectBoard = selectBoard;
        vm.createBoard = createBoard;

        var promise = trelloService.members.boards().then(
            function(result) {
                vm.boards = result.data;
                var create_board_element = $('#createBoardElement');
                create_board_element.show();
            },
            function(error) {
                console.log();
            });

        vm.boardPromise = {
            promise: promise,
            message: 'Loading Boards'
        };


        function selectBoard(board) {
            trelloService.boards.postInSession(board);
            trelloService.boards.postStatesInSession(board.id);
            $location.path('/configuration');
        }

        function createBoard() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/proyectotesis/view/board/create_board.html',
                controller: 'createBoardController',
                controllerAs: 'vm',
                size: 'lg'
            });
            modalInstance.result.then(
                function(board) {
                    selectBoard(board);
                },
                function() {

                });
        }
    };
})();
