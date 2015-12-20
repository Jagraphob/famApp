(function () {
    'use strict';
    
    
    angular.module('famApp')
        .factory('shoppingListSvc', ['$scope', shoppingListSvc]);

    function shoppingListSvc () {
        
        return {
            add: add,
            remove: remove
        };
        
        function add () {
            
        }
        
        function remove () {
            
        }
    }

}());