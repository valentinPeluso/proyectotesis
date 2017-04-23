(function() {
    'use strict';

    angular.module('app.login')
        .controller('loginController', loginController)

    loginController.$inject = ['githubService', '$location'];

    function loginController(githubService, $location) {
        var vm = this;

        vm.password = '';
        vm.username = '';

        vm.login = login;

        function login() {
            if (vm.password !== '' && vm.username !== '') {
                githubService.users.authenticate(vm.username, vm.password).then(
                    function(result) {
                        if (result.status == 200) {
                            githubService.users.postInSession(result.data);
                            $location.path('/repository');
                        }
                    },
                    function(err) {
                        debugger;
                    }
                );
            }
        }
    }

})();
