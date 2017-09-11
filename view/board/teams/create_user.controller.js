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
        'possible_roles'
    ];

    function createUserController(
        $uibModalInstance,
        ngToast,
        trelloService,
        possible_roles
    ) {
        var vm = this;

        vm.cancel = cancel;
        vm.createUser = createUser;
        vm.findUser = findUser;

        function activate() {
            vm.serchingUser = false;
            vm.possible_roles = possible_roles;
            vm.user = {};
        }

        function findUser() {
            vm.serchingUser = true;
            trelloService.search.searchUser(vm.user).then(
                function(result) {
                    vm.user.id = result.data[0].id;
                    vm.user.fullName = result.data[0].fullName;
                    vm.user.username = result.data[0].username;
                    vm.serchingUser = false;
                },
                function(err) {
                    throw err;
                    vm.serchingUser = false;
                });
        }

        function createUser() {
            $uibModalInstance.close(vm.user);
        }

        function cancel(argument) {
            $uibModalInstance.dismiss('cancel');
        }

        activate();
    }
})();
