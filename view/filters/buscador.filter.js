(function () {
    'use strict';

    angular
        .module('app.filters')
        .service('buscadorService', buscadorService)
        .filter('buscador', buscador)
        .run(runStorageService)

    buscadorService.$inject = ['$filter','storageService'];
    buscador.$inject = ['$filter', 'buscadorService'];
    runStorageService.$inject = ['buscadorService']

    function buscadorService($filter,storageService) {
        var filter = {
            get: filtro_get,
            post: filtro_post,
            //filtrar: filtrar_data,
        }

        return filter;
        
        function filtro_get() {
            var storage = {
                id: 'FiltroBuscador',
            }
            return storageService.session.get(storage);
        }

        function filtro_post(content) {
            var storage = {
                id: 'FiltroBuscador',
                data: content
            }
            storageService.session.put(storage);
        }

        // function filtrar_data(object,array) {
        //     return _.includes(_.map($filter('filter')(array,this.get()),'id'), object.id);
        // }
        
    }

    function buscador($filter, buscadorService) {
        var filter = function (array) {
            return $filter('filter')(array, buscadorService.get());
        };

        return filter;
    }
    function runStorageService(buscadorService) {
        buscadorService.post("");
    }
})();