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
       'app.verification_validation',
       'app.requirements',
       'app.configuration',       

       'app.components',
       'app.directives',
       'app.filters',
       'app.services',
       'app.ui_services',
       'xeditable',
       'dndLists'
        
       
    ])
    
})();