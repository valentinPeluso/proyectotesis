(function() {
    'use strict';

    angular.module('app', [
        /* Angular modules */
        'ngRoute',
        'ngAnimate',

        'ui.select',
        'ui.bootstrap',
        'ngToast',
        'cgBusy',

        /* 3rd-party modules */
        'app.nav',
        'app.verification_validation',
        'app.requirements',
        'app.configuration',
        'app.analysis',
        'app.login',
        'app.repository',
        'app.development',
        'app.board',
        'app.interceptors',

        'app.components',
        'app.directives',
        'app.filters',
        'app.services',
        'app.ui_services',
        'xeditable',
        'dndLists',
        'isteven-multi-select',
        'ngFileUpload'
    ]);

})();
