(function () {
    'use strict';
    
    angular.module('famApp')
        .controller('mainCtrl', ['$scope', '$state', mainCtrl]);
    
    function mainCtrl ($scope, $state) {
        var vm = this;
        
        vm.isCollapsed = true;               
    }

}());