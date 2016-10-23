(function () {
    'use strict';

    angular.module('app')
        .run(run)
        
        run.$inject = ["editableOptions"]

    function run(editableOptions) {
        
         editableOptions.theme = 'bs3'; // ANGULAR-XEDITABLE: bootstrap3 theme. Can be also 'bs2', 'default'
        
    }
})();