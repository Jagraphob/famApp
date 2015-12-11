(function () {
    'use strict';

    angular.module('famApp', [
        'ui.bootstrap',
        'ui.router'
    ])
        .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
            });            
        }]);        
})();