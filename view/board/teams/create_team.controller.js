(function() {
    'use strict';

    /* global _ */
    /* global angular */

    angular.module('app.board')
        .controller('createTeamController', createTeamController);

    createTeamController.$inject = [
        '$uibModalInstance',
        'ngToast'
    ];

    function createTeamController(
        $uibModalInstance,
        ngToast
    ) {
        var vm = this;

        vm.cancel = cancel;
        vm.createTeam = createTeam;

        function activate() {
            vm.team = {
                name: '',
                description: ''
            };
        }

        function createTeam() {
            $uibModalInstance.close(vm.team);
        }

        function cancel(argument) {
            $uibModalInstance.dismiss('cancel');
        }

        activate();
    }
})();
