(function() {
    'use strict';

    angular.module('app.repository')
        .controller('createRepositoryController', createRepositoryController)

    createRepositoryController.$inject = ['githubService', '$uibModalInstance'];

    function createRepositoryController(githubService, $uibModalInstance) {
        var vm = this;

        vm.repository = {
            name: ''
        };
        vm.members = [];
        vm.member = {
            fullName: '',
            email: ''
        }

        vm.cancel = cancel;
        vm.createRepository = createRepository;
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

        function cancel(argument) {
            $uibModalInstance.dismiss('cancel');
        }

        function createRepository() {
            debugger;
        }
    };
})();
