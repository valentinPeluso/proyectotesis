(function() {
    'use strict';

    angular
        .module('app.components')
        .component('tgCreateRequeriment', {
            templateUrl: '/proyectotesis/view/components/requeriment/create_requeriment.html',
            controller: 'createRequerimentComponentController',
            bindings: {
                idRequerimentList: '<'
            }
        })
        .component('tgDetailRequeriment', {
            templateUrl: '/proyectotesis/view/components/requeriment/detail_requeriment.html',
            controller: 'detailRequerimentComponentController',
            bindings: {
                idRequeriment: '<',
                idRequerimentList: '<'
            }
        })
        .component('tgUpdateRequeriment', {
            templateUrl: '/proyectotesis/view/components/requeriment/update_requeriment.html',
            controller: 'updateRequerimentComponentController',
            bindings: {
                idRequeriment: '<',
                idRequerimentList: '<'
            }
        });

})();
