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
        '$uibModal'
    ];

    function createBoardController(
        trelloService,
        $uibModalInstance,
        $q,
        ngToast,
        jsonFormatterService,
        $uibModal
    ) {
        var vm = this;

        vm.board = {
            name: ''
        };
        // vm.members = [];
        // vm.member = {
        //     fullName: '',
        //     username: '',
        //     email: '',
        //     roles: []
        // };
        vm.teams = [];
        vm.repositoryUsers = [];

        vm.possible_roles = [];

        vm.cancel = cancel;
        vm.createBoard = createBoard;

        vm.createTeam = createTeam;
        vm.updateTeam = updateTeam;
        vm.removeTeam = removeTeam;

        vm.createUser = createUser;
        vm.updateUser = updateUser;
        vm.removeUser = removeUser;

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

        // function addMember() {
        //     vm.members.push(vm.member);
        //     vm.member = {
        //         fullName: '',
        //         username: '',
        //         email: '',
        //         roles: []
        //     };
        // }

        // function removeMember(index) {
        //     _.remove(vm.members, function(member, pos) {
        //         return pos == index;
        //     });
        // }

        function createTeam() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/proyectotesis/view/board/teams/create_team.html',
                controller: 'createTeamController',
                controllerAs: 'vm',
                size: 'md'
            });
            modalInstance.result.then(
                function(team) {
                    team.users = [];
                    vm.teams.push(team);
                },
                function(err) {
                    throw err;
                });
        }

        function updateTeam() {}

        function removeTeam() {}

        function createUser(team) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/proyectotesis/view/board/teams/create_user.html',
                controller: 'createUserController',
                controllerAs: 'vm',
                resolve: {
                    possible_roles: function() {
                        return vm.possible_roles;
                    }
                },
                size: 'md'
            });
            modalInstance.result.then(
                function(createdUser) {
                    //usuario para registrar en Trello
                    team.users.push(createdUser.trelloUser);
                    //usuario para registrarlo en el repositorio
                    vm.repositoryUsers.push(createdUser.githubUser);
                },
                function(err) {
                    throw err;
                });
        }

        function updateUser() {}

        function removeUser() {}

        function addMembersToBoard(boardId) {
            var deferred = $q.defer();
            var promises = [];

            trelloService.boards.postUsersInSession(vm.teams);

            //Agrega los members al board
            _.forEach(vm.teams, function(team, pos) {
                _.forEach(team.users, function(user, pos) {
                    promises.push(
                        trelloService.boards.addMemberToBoard(boardId, user)
                    );
                });
            });

            $q.all(promises).then(
                function(result) {

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

        function addTeamsToBoard(boardId) {
            var deferred = $q.defer();
            var promises = [];

            _.forEach(vm.teams, function(team, pos) {
                promises.push(
                    trelloService.boards.addListToBoard(
                        boardId, { name: team.name }
                    ).then(
                        function(result) {
                            var createdList = result.data;
                            var membersPromises = [];
                            var card;
                            _.forEach(team.users, function(member, pos) {
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
                    )
                );
            });

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
                    // Crear el repositorio
                    promises = promises.concat(addMembersToBoard(board.id));
                    promises = promises.concat(addTeamsToBoard(board.id));
                    promises = promises.concat(addListsToBoard(board.id));
                    promises = promises.concat(addLabelsToBoard(board.id));

                    $q.all(promises).then(
                        function(result) {
                            console.log(board);

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
