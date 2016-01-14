(function () {
    'use strict';

    angular.module('famApp')
        .factory('shoppingListService', ['$http', 'REST_URL', shoppingListService]);
    
    function shoppingListService ($http, REST_URL) {
        
        return {
            getItems: getItems,
            newItem: newItem,
            removeItem: removeItem
        };
        
        function getItems () {
            return $http.get(REST_URL + 'shoppinglist');
        }
        
        function newItem (item) {
            return $http.post(REST_URL + 'shoppinglist/new', item);
        }
        
        function removeItem (id) {
            return $http.delete(REST_URL + 'shoppinglist/delete/' + id);
        }
    }
    

}());