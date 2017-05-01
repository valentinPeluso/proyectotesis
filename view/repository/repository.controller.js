(function() {
    'use strict';

    angular.module('app.repository')
        .controller('repositoryController', repositoryController)

    repositoryController.$inject = ['githubService', '$uibModal', '$location'];

    function repositoryController(githubService, $uibModal, $location) {
        var vm = this;

        vm.repositories = [];

        vm.selectRepository = selectRepository;
        vm.createRepository = createRepository;

        var promise = githubService.repos.getRepos().then(
            function(result) {
                vm.repositories = result.data;
                var create_repository_element = $('#createRepositoryElement');
                create_repository_element.show();
            },
            function(error) {
                console.log();
            });

        vm.repositoriesPromise = {
            promise: promise,
            message: 'Loading Repositories'
        };


        function selectRepository(repository) {
            githubService.repos.postInSession(repository);
            // trelloService.boards.postStatesInSession(board.id);
            $location.path('/board');
        }

        function createRepository() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/view/repository/create_repository.html',
                controller: 'createRepositoryController',
                controllerAs: 'vm',
                size: 'md'
            });
            modalInstance.result.then(
                function(repository) {
                    selectRepository(repository);
                },
                function() {

                });
        }
    };
})();
