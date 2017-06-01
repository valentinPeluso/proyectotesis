(function() {
    'use strict';

    /* global _ */
    /* global angular */

    angular.module('app.board')
        .controller('createBoardController', createBoardController);

    createBoardController.$inject = [
        'trelloService',
        '$uibModalInstance',
        '$q',
        'ngToast',
        'jsonFormatterService',
    ];

    function createBoardController(
        trelloService,
        $uibModalInstance,
        $q,
        ngToast,
        jsonFormatterService
    ) {
        var vm = this;

        vm.board = {
            name: ''
        };
        vm.members = [];
        vm.member = {
            fullName: '',
            username: '',
            email: '',
            roles: []
        };
        vm.possible_roles = [];

        vm.cancel = cancel;
        vm.createBoard = createBoard;
        vm.addMember = addMember;
        vm.removeMember = removeMember;

        function activate() {
            var promise = trelloService.user.getAllRoles();

            promise.then(
                function(result) {
                    vm.possible_roles = result.data;
                },
                function(err) {
                    throw err;
                }
            );

            vm.promise = {
                promise: promise,
                message: 'Getting possible roles'
            };
        }

        function addMember() {
            vm.members.push(vm.member);
            vm.member = {
                fullName: '',
                username: '',
                email: '',
                roles: []
            };
        }

        function removeMember(index) {
            _.remove(vm.members, function(member, pos) {
                return pos == index;
            });
        }

        function addMembersToBoard(boardId) {
            var deferred = $q.defer();
            var promises = [];

            _.forEach(vm.members, function(member, pos) {
                promises.push(
                    trelloService.boards.addMemberToBoard(boardId, member)
                );
            });

            $q.all(promises).then(
                function(result) {
                    var members = _.last(result).data.members;

                    _.forEach(members, function(member) {
                        var mem = _.find(vm.members, {
                            username: member.username
                        });
                        if (typeof mem !== 'undefined') {
                            member.roles = mem.roles;
                        }
                        else {
                            member.roles = [{
                                id: 'Admin',
                                name: 'Administrator'
                            }];
                        }
                    });

                    vm.members = members;

                    trelloService.boards.postUsersInSession(vm.members);

                    deferred.resolve(result);
                },
                function(err) {
                    throw err;
                }
            );
            return [deferred.promise];
        }

        function addListsToBoard(boardId) {
            var promises = [];
            var lists = [{
                name: 'Requeriments'
            }, {
                name: 'Backlog'
            }, {
                name: 'Attachments'
            }, {
                name: 'Sprint 1'
            }, {
                name: 'Sprint 2'
            }, {
                name: 'Sprint 3'
            }];
            _.forEach(lists, function(list, pos) {
                promises.push(
                    trelloService.boards.addListToBoard(boardId, list)
                );
            });
            return promises;
        }

        function addLabelsToBoard(boardId) {
            var promises = [
                trelloService.boards.addLabelBlue(boardId, {
                    value: 'Not started'
                }),
                trelloService.boards.addLabelGreen(boardId, {
                    value: 'Closed'
                }),
                /* 
                    El estado de Ready for check no se está usando, 
                    ver de remplazar por otro estado
                */
                // trelloService.boards.addLabelOrange(boardId, {
                //     value: 'Ready for check'
                // }),
                trelloService.boards.addLabelPurple(boardId, {
                    value: 'Ready for test'
                }),
                trelloService.boards.addLabelRed(boardId, {
                    value: 'Carry over'
                }),
                trelloService.boards.addLabelYellow(boardId, {
                    value: 'Ready for dev'
                })
            ];

            return promises;
        }

        function addUserRolesToBoard(boardId) {
            var deferred = $q.defer();
            var promises = [deferred.promise];
            var list = {
                name: 'Users'
            };

            trelloService.boards.addListToBoard(boardId, list).then(
                function(result) {
                    var createdList = result.data;
                    var membersPromises = [];
                    var card;
                    _.forEach(vm.members, function(member, pos) {
                        card = {
                            name: member.fullName,
                            desc: jsonFormatterService.jsonToString(member)
                        };
                        membersPromises.push(
                            trelloService.lists.createCard(
                                createdList.id,
                                card
                            )
                        );
                    });
                    $q.all(membersPromises).then(
                        function(result) {
                            deferred.resolve(result);
                        },
                        function(err) {
                            deferred.reject(err);
                            throw err;
                        }
                    );
                },
                function(err) {
                    deferred.reject(err);
                    throw err;
                }
            );

            return promises;
        }

        function createBoard() {
            var deferred = $q.defer();
            vm.promise = {
                promise: deferred.promise,
                message: 'Creating board'
            };
            trelloService.boards.create(vm.board).then(
                function(result) {
                    var board = result.data;

                    var promises = [];
                    promises = promises.concat(addMembersToBoard(board.id));
                    promises = promises.concat(addUserRolesToBoard(board.id));
                    promises = promises.concat(addListsToBoard(board.id));
                    promises = promises.concat(addLabelsToBoard(board.id));

                    $q.all(promises).then(
                        function(result) {
                            console.log(board);
                            debugger;
                            deferred.resolve(board);
                        },
                        function(err) {
                            throw err;
                        }
                    );
                },
                function(err) {
                    throw err;
                });
            deferred.promise.then(
                function(board) {
                    ngToast.success({
                        content: 'Board created successful'
                    });
                    $uibModalInstance.close(board);
                },
                function(err) {
                    throw err;
                });

        }

        function cancel(argument) {
            $uibModalInstance.dismiss('cancel');
        }

        activate();
    };
})();
