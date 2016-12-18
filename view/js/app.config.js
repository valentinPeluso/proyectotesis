(function () {
    'use strict';

    angular.module('app')
        .config(configCore);
        
    configCore.$inject=['ngToastProvider', '$animateProvider', '$compileProvider', '$httpProvider']; 

    function configCore(ngToastProvider, $animateProvider, $compileProvider, $httpProvider) {
        ngToastProvider.configure({
            horizontalPosition: 'right',
            verticalPosition: 'top',
            timeout: 5000,
            animation: 'fade'
        });
        $animateProvider.classNameFilter(/(animate|toast)/);
        $compileProvider.debugInfoEnabled(false);
        
        $httpProvider.interceptors.push('trelloInterceptor');
      
        /* global Trello */
        Trello.authorize({
            type: 'popup',
            name: 'Project Trello-Github Application',
            scope: {
                read: 'true',
                write: 'true' },
            expiration: 'never',
            success: function() {
                $httpProvider.defaults.headers.common.Authorization = Trello.token();
            },
            error: function(err) {
              
            }
        });
        
    }
})();