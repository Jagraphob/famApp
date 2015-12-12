(function () {
    'use strict';
    
    angular.module('famApp')
        .controller('homeCtrl', ['$scope', homeCtrl]);
    
    function homeCtrl () {
        var vm = this;
        

        vm.test = 'hello';
        

        
    }

}());