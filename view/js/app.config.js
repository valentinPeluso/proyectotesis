(function () {
    'use strict';

    angular.module('app')
        .config(configCore)
        
    configCore.$inject=['ngToastProvider','$animateProvider','$compileProvider']; 

    function configCore(ngToastProvider,$animateProvider,$compileProvider) {
        ngToastProvider.configure({
            horizontalPosition: 'right',
            verticalPosition: 'top',
            timeout: 5000
        });
        $animateProvider.classNameFilter(/(animate|toast)/);
        $compileProvider.debugInfoEnabled(false);
        
    }
})();