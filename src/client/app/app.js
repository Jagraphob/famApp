(function () {
    'use strict';

    angular.module('famApp', [
        'ui.bootstrap',
        'ui.router',
        'ngAnimate',
        'famApp.config'
    ])
        .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;           
        }]);        
})();