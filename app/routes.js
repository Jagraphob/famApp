(function () {
    'use strict';

    angular.module('famApp')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/shoppinglist");

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/components/home/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'vm',
                    data : {
                        pageTitle: "Home"
                    }
                })
                .state('shoppingList', {
                    url: '/shoppinglist',
                    templateUrl: 'app/components/shoppinglist/shoppinglist.html',
                    controller: 'shoppingListCtrl',
                    controllerAs: 'vm',
                    data : {
                        pageTitle: "Shopping List"
                    }
                
                });
        }]);
})();