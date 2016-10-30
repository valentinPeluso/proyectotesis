(function () {
    'use strict';

    angular
        .module('app.ui_services')
        .factory('UICardService', UICardService);

    UICardService.$inject = ['$uibModal'];

    function UICardService($uibModal) {
        var service = {
            open: open,
            getMokedCards: getMokedCards
        };

        return service;
        
        function open(card) {
            var modalInstance = $uibModal.open({
                animation: true,                
                templateUrl: '/proyectotesis/view/ui_services/card/card.html',
                controller: 'viewCardController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    card: function () {
                        return card;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $ctrl.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function getMokedCards() {
            return [
                {
                    id: "123",
                    title: "Title of Card 1",
                    description: "Description of the card",
                    points: 3,
                    assignee: 1,
                    pull_request_linked: true,
                    comments: 5,
                    state: 1,
                    priority: 3,
                    business_rules: [
                        {
                            description: 'Business rule one',
                            completed: false
                        },
                        {
                            description: 'Business rule two',
                            completed: true
                        },
                        {
                            description: 'Business rule three',
                            completed: false
                        },
                        {
                            description: 'Business rule four',
                            completed: false
                        },
                    ],
                    issue_links: [1, 3]
                },
                {
                    id: "231",
                    title: "Title of Card 2",
                    description: "Description of the card",
                    points: 1,
                    assignee: 2,
                    pull_request_linked: false,
                    comments: 2,
                    state: 1,
                    priority: 1
                },
            ];
        }
    }

})();