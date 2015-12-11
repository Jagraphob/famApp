(function () {
    'use strict';
    
    angular.module('famApp')
        .controller('mainCtrl', ['$scope', mainCtrl]);
    
    function mainCtrl () {
        var vm = this;
        
        vm.test = "hello";
    }

}());