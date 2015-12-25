(function () {
    'use strict';

    angular.module('famApp')
        .factory('shoppingListService', ['$http', 'REST_URL', shoppingListService]);
    
    function shoppingListService ($http, REST_URL) {
        
        return {
            getItems: getItems,
            newItem: newItem
        };
        
        function getItems () {
            return $http.get(REST_URL + 'shoppinglist');
        }
        
        function newItem (item) {
            return $http.post(REST_URL + 'newshoppingitem', item);
        }
    }
    

}());