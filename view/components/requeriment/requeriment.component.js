(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCreateRequeriment', {
            templateUrl: '/view/components/requeriment/create_requeriment.html',
            controller: 'createRequerimentComponentController',
            bindings: {
                idRequerimentList: '<'
            }
        })
        .component('tgDetailRequeriment', {
            templateUrl: '/view/components/requeriment/detail_requeriment.html',
            controller: 'detailRequerimentComponentController',
            bindings: {
                requeriment: '<',
            }
        })
        .component('tgUpdateRequeriment', {
            templateUrl: '/view/components/requeriment/update_requeriment.html',
            controller: 'updateRequerimentComponentController',
            bindings: {
                idRequeriment: '<',
            }
        });

})();
