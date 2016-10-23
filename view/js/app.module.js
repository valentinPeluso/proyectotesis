(function () {
    'use strict';

    angular.module('app', [
        /* Angular modules */
        'ngRoute',
        // 'ngAnimate',
        
        'ui.select',
        'ui.bootstrap',
        'ngToast',

        /* 3rd-party modules */
       'app.nav',
       'app.turnos',
       
       'app.components',
       'app.filters',
       'app.services',
       'xeditable'
        
       
    ])
    
})();