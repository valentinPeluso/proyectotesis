(function() {
    'use strict';

    /* global _ */
    /* global angular */

    angular.module('app.board')
        .controller('createUserController', createUserController);

    createUserController.$inject = [
        '$uibModalInstance',
        'ngToast',
        'trelloService',
        'possible_roles',
        '$q',
        'githubService'
    ];

    function createUserController(
        $uibModalInstance,
        ngToast,
        trelloService,
        possible_roles,
        $q,
        githubService
    ) {
        var vm = this;

        vm.cancel = cancel;
        vm.createUser = createUser;
        vm.findUser = findUser;

        function activate() {
            vm.serchingUser = false;
            vm.possible_roles = possible_roles;
            vm.email = '';
            vm.trelloUser = {};
            vm.githubUser = {};
        }

        function findUser() {
            vm.serchingUser = true;
            $q.all({
                trello: trelloService.search.searchUser({ email: vm.email }),
                github: githubService.search.searchUser({ email: vm.email })
            }).then(
                function(result) {
                    vm.trelloUser = result.trello.data[0];
                    vm.githubUser = result.github.data.user;
                    vm.serchingUser = false;
                },
                function(err) {
                    throw err;
                    vm.serchingUser = false;
                });
        }

        function createUser() {
            $uibModalInstance.close({
                trelloUser: vm.trelloUser,
                githubUser: vm.githubUser
            });
        }

        function cancel(argument) {
            $uibModalInstance.dismiss('cancel');
        }

        activate();
    }
})();
