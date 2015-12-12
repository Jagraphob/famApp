(function () {
    'use strict';

    angular.module('famApp')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/components/home/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'vm'
                })
                .state('shoppingList', {
                    url: '/shoppinglist',
                    templateUrl: 'app/components/shoppinglist/shoppinglist.html',
                    controller: 'shoppingListCtrl',
                    controllerAs: 'vm'
                
                });




        }]);


})();