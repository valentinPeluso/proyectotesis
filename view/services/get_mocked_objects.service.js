(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mockedObjectsService', mockedObjectsService);

    mockedObjectsService.$inject = [];

    function mockedObjectsService() {
        var service = {
            cards: {
                getMokedCards: getMokedCards,
                getMockedCardsStates: getMockedCardsStates,
                getMockedIssuesLinks: getMockedIssuesLinks,
                getMockedPossibleAssigness: getMockedPossibleAssigness
            },
            pull_requests: {
                getMockedPullRequests: getMockedPullRequests,
                getMockedCommentsPullRequests: getMockedCommentsPullRequests
            },
            sprints: {
                getMockesSprints: getMockesSprints,
                getMockedBacklog: getMockedBacklog
            }
        };

        return service;

        function getMockedBacklog() {
            return {
                 quantity_cards: 3,
                 ids_cards: [1, 2, 3]
            }
        }
        function getMockesSprints() {
            return [
                {
                    title: 'Sprint 1',
                    quantity_pull_requests: 5,
                    ids_pull_requests: [1, 2, 3, 4, 7],
                    points_made: 3,
                    points_total: 10,
                    state: 'Open',
                    quantity_cards: 5,
                    ids_cards: [1, 2, 3]
                },
                {
                    title: 'Sprint 1',
                    quantity_pull_requests: 5,
                    ids_pull_requests: [1, 2, 3, 4, 7],
                    points_made: 3,
                    points_total: 10,
                    state: 'Closed',
                    quantity_cards: 5,
                    ids_cards: [1, 2, 3]
                },
                {
                    title: 'Sprint 1',
                    quantity_pull_requests: 5,
                    ids_pull_requests: [1, 2, 3, 4, 7],
                    points_made: 3,
                    points_total: 10,
                    state: 'Closed',
                    quantity_cards: 5,
                    ids_cards: [1, 2, 3]
                }
            ]
        }
        function getMockedPossibleAssigness() {
            return [
                { id: 1, user: 'Valentin'},
                { id: 2, user: 'Matias'},
                { id: 3, user: 'Cristian'},
                { id: 4, user: 'Tebi'},
            ];
        }
        function getMockedIssuesLinks() {
            return [
                { id: 1, description: 'Title of card linked one'},
                { id: 2, description: 'Title of card linked two'},
                { id: 3, description: 'Title of card linked three'},
                { id: 4, description: 'Title of card linked fout'},
            ];
        }
        function getMokedCards() {
            return [
                {
                    id: 1,
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
                    id: 2,
                    title: "Title of Card 2",
                    description: "Description of the card",
                    points: 1,
                    assignee: 2,
                    pull_request_linked: false,
                    comments: 2,
                    state: 1,
                    priority: 1,
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
            ];
        }
        function getMockedPullRequests() {
            return [                
                {
                    id: 1,
                    label: 'Mariano'
                },
                {
                    id: 2,
                    label: 'Sofía'
                },
                {
                    id: 3,
                    label: 'Pedro'
                },
                {
                    id: 4,
                    label: 'Micaela'
                },
                {
                    id: 5,
                    label: 'Carlos'
                },
                {
                    id: 6,
                    label: 'Laura'
                },
                {
                    id: 7,
                    label: 'Emma'
                },
                {
                    id: 8,
                    label: 'Matias'
                },
                {
                    id: 9,
                    label: 'Cristian'
                },
                {
                    id: 10,
                    label: 'Juan'
                },
            ];
        }
        function getMockedCommentsPullRequests() {
            return [
                {
                    id: 3,
                    label: 'Estrategía de anulación'
                },
                {
                    id: 1,
                    label: 'Estrategía de disminución'
                },
                {
                    id: 2,
                    label: 'Estrategía de contingencia'
                },
            ];
        }
        function getMockedCardsStates() {
            return [                
                {
                    id: 1,
                    label: 'No started',
                    clases: 'label label-info'
                },
                {
                    id: 2,
                    label: 'Redy for dev',
                    clases: 'label label-primary'
                },
                {
                    id: 3,
                    label: 'Closed',
                    clases: 'label label-success'
                },
                {
                    id: 4,
                    label: 'Carry over',
                    clases: 'label label-danger'
                },
                {
                    id: 5,
                    label: 'Ready for check',
                    clases: 'label label-warning'
                },
                {
                    id: 6,
                    label: 'Ready for test',
                    clases: 'label label-warning'
                }                
            ];
        }
    }

})();