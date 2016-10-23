(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('storageService', storage);

    function storage(ngToast, $route, $window, $cacheFactory, $q, $http) {
        var service = {
            session: {
                get: session_get_data,
                put: session_put_data,
                remove: session_remove_data,
            },
            local: {
                get: local_get_data,
                put: local_put_data
            },
            cache: {
                get: cache_get_data,
                put: cache_put_data,
                post: cache_post_data,
                destroy: cache_destroy_cache,
            }
        };
        var unresolved_promises = {};

        return service;        

        function local_get_data(id) {}
        function local_put_data(id, data, redirect) {}

        function session_get_data(storage) {
            var data = null;
            try {
                data = JSON.parse(sessionStorage.getItem(storage.id));
            } catch (err) {
                if (typeof storage.id == 'undefined')
                    ngToast.create({ content: "El ID de almacenamiento es un campo obligatorio.", className: "warning" });
                else
                    ngToast.create({ content: "Error al obtener la información.", className: "danger" });
            }
            return data;
        }
        function session_put_data(data) {
            if (typeof (Storage) !== "undefined") {
                if (typeof data.id == 'undefined') {
                    ngToast.create({ content: "Se debe especificar un ID de almacenamiento", className: "warning" });
                    return;
                }
                if (typeof data.data == 'undefined') {
                    ngToast.create({ content: "Se debe especificar cual es la data que se va a guardar", className: "warning" });
                    return;
                }
                try {
                    sessionStorage.setItem(data.id, JSON.stringify(data.data));
                } catch (err) {
                    ngToast.create({ content: "Error al guardar la información", className: "warning" });
                    $route.reload();
                }
                if (typeof data.redirect !== 'undefined') {
                    $window.location.href = data.redirect;
                    return;
                }
                return;
            } else {
                ngToast.create({ content: "Error al guardar la información", className: "warning" });
                return;
            }
        }
        function session_remove_data(storage) {
            try {
                sessionStorage.removeItem(storage.id);
            } catch (err) {
                if (typeof storage.id == 'undefined')
                    ngToast.create({ content: "El ID de almacenamiento es un campo obligatorio.", className: "warning" });
                else
                    ngToast.create({ content: "Error al remover la información.", className: "danger" });
            }
        }

        function cache_get_data(url) {
            //Este metodo hace un GET de la entidad utilizando cache
            //La logica es que si se hace un get a la misma entidad dos o mas veces seguidas antes 
            //de que se resuelva el metodo, todos los metodos deberían esperar a que vuelva la data de back.
            //Para manejar esta situación se usa la variable unresolved_promises
            var cache = $cacheFactory.get(url);
            var deferred = $q.defer();
            if (typeof cache == 'undefined') {
                cache = $cacheFactory(url);
                unresolved_promises[url] = [deferred];
                $http.get(url).then(function (result) {
                    cache.put('data', result.data);
                    var deferreds = _.get(unresolved_promises, url);
                    _.forEach(deferreds, function (def) {
                        def.resolve(result.data);
                    })
                    unresolved_promises = _.omit(unresolved_promises, url);
                });
            } else {
                if (cache.get('data') != null) {
                    deferred.resolve(cache.get('data'));
                } else {
                    //Quiere decir que todavia no volvio la data del back
                    unresolved_promises[url].push(deferred);
                }
            }
            return deferred.promise;
        }

        function cache_put_data(url, dto) {
            //Este metodo hace un PUT de la entidad
            //como esta entidad estaba cacheada, se destruye la cache luego de hacer el PUT
            //para forzar a que el proximo get se haga sin cache
            var cache = $cacheFactory.get(url);
            var deferred = $q.defer()

            $http.put(url, dto).then(function (result) {
                deferred.resolve(result.data);
            });
            if (typeof cache !== 'undefined') {
                //Para la primera vez que hace un put para una entidad,
                //cache va estar definido.
                //Pero si hace un put dos veces en la misma ui la cache va a estar indefinida
                cache.destroy();
            }

            return deferred.promise;
        }

        function cache_post_data(url, dto) {
            //Este metodo hace un POST de la entidad
            //como esta entidad estaba cacheada, se destruye la cache luego de hacer el POST
            //para forzar a que el proximo get se haga sin cache
            var cache = $cacheFactory.get(url);
            var deferred = $q.defer()

            $http.post(url, dto).then(function (result) {
                cache.deferred.resolve(result.data);
            });

            if (typeof cache !== 'undefined') {
                //Para la primera vez que hace un put para una entidad,
                //cache va estar definido.
                //Pero si hace un post dos veces en la misma ui la cache va a estar indefinida
                cache.destroy();
            }

            return deferred.promise;
        }

        function cache_destroy_cache(url) {
            //Este metodo sirve para forzar la destrucciòn de la cache de una entidad
            //sirve para casos, como por ejemplo el get de usuarios activos
            //que el get y el post se hacen con url distintas
            //como este servicio levanta la cache usando como id la url de la ruta
            //es necesario destruir la cache desde afuera del servicio
            var cache = $cacheFactory.get(url);
            if (typeof cache !== 'undefined') {
                cache.destroy();
            }
        }
    }
    
})();