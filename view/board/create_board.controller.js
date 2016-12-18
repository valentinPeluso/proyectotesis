(function () {
    'use strict';

    angular.module('app.board')
    .controller('createBoardController', createBoardController)
    
    createBoardController.$inject = ['trelloService', '$uibModalInstance', '$q', 'ngToast'];
    
    function createBoardController(trelloService, $uibModalInstance, $q, ngToast){
        var vm = this;
        
        vm.board = {
            name: ''
        };
        vm.members = [];
        vm.member = {
            fullName: '',
            email: ''
        }
        
        vm.cancel = cancel;
        vm.createBoard = createBoard;
        vm.addMember = addMember;
        vm.removeMember = removeMember;
        
        function addMember() {
            vm.members.push(vm.member);
            vm.member = {
                fullName: '',
                email: ''
            }
        }
        function removeMember(index) {
            _.remove(vm.members, function(member, pos) {
                return pos == index;
            });
        }
        
        function createBoard() {
            var deferred = $q.defer();
            vm.createBoardPromise = {
                promise: deferred.promise,
                message: 'Creating board'
            }
            trelloService.boards.create(vm.board).then(
                function (result) {
                    var board = result.data;
                    var boardId = result.data.id;
                   
                    var cantPromiseResolved = 0,
                        cantPromiseMembers = vm.members.length,
                        cantPromiseList = 4,
                        cantPromiseLabels = 6,
                        cantPromise =  cantPromiseMembers + cantPromiseList + cantPromiseLabels;
                    
                    //Members
                    _.forEach(vm.members, function(member, pos) {
                        trelloService.boards.addMemberToBoard(boardId, member).then(
                            function(result) {
                                cantPromiseResolved++;
                                if (cantPromiseResolved == cantPromise) {
                                    deferred.resolve(board);
                                }
                            }, function(err) {
                                console.log();
                            });
                    });
                    
                    //Lists
                    var lists = [
                        {
                            name: 'Backlog',
                        },
                        {
                            name: 'Sprint 1',
                        },
                        {
                            name: 'Sprint 2',
                        },
                        {
                            name: 'Sprint 3',
                        }
                    ];
                    _.forEach(lists, function(list, pos) {
                        trelloService.boards.addListToBoard(boardId, list).then(
                            function(result) {
                                cantPromiseResolved++;
                                if (cantPromiseResolved == cantPromise) {
                                    deferred.resolve(board);  
                                }
                            }, function(err) {
                                console.log();
                            });
                    });
                    
                    //Labels
                    trelloService.boards.addLabelBlue(boardId, { value: 'Not started'}).then(
                        function(result) {
                            cantPromiseResolved++;
                            if (cantPromiseResolved == cantPromise) {
                                deferred.resolve(board);  
                            }
                        }, function(err) {
                            
                        })
                    trelloService.boards.addLabelGreen(boardId, { value: 'Closed'}).then(
                        function(result) {
                            cantPromiseResolved++;
                            if (cantPromiseResolved == cantPromise) {
                                deferred.resolve(board);  
                            }    
                        }, function(err) {
                            
                        })
                    trelloService.boards.addLabelOrange(boardId, { value: 'Ready for check'}).then(
                        function(result) {
                            cantPromiseResolved++;
                            if (cantPromiseResolved == cantPromise) {
                                deferred.resolve(board);  
                            }    
                        }, function(err) {
                            
                        })
                    trelloService.boards.addLabelPurple(boardId, { value: 'Ready for test'}).then(
                        function(result) {
                            cantPromiseResolved++;
                            if (cantPromiseResolved == cantPromise) {
                                deferred.resolve(board);  
                            }    
                        }, function(err) {
                            
                        })
                    trelloService.boards.addLabelRed(boardId, { value: 'Carry over'}).then(
                        function(result) {
                            cantPromiseResolved++;
                            if (cantPromiseResolved == cantPromise) {
                                deferred.resolve(board);  
                            }    
                        }, function(err) {
                            
                        })
                    trelloService.boards.addLabelYellow(boardId, { value: 'Ready for dev'}).then(
                        function(result) {
                            cantPromiseResolved++;
                            if (cantPromiseResolved == cantPromise) {
                                deferred.resolve(board);  
                            }    
                        }, function(err) {
                            
                        })
                    
                }, function (err) {
                    console.log();
                });
                deferred.promise.then(
                    function (board) {
                        ngToast.success({ content: 'Board created successful'});
                        $uibModalInstance.close(board);
                    }, function (err) {
                        // body...
                    });
            
        }
        
        function cancel(argument) {
            $uibModalInstance.dismiss('cancel');
        }
    };
})();