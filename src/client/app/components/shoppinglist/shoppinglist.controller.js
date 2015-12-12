(function () {
    'use strict';
    
    angular.module('famApp')
        .controller('shoppingListCtrl', ['$scope', shoppingListCtrl]);
    
    function shoppingListCtrl () {
        var vm = this;
        

        vm.test = 'hello';
        

        
    }

}());