(function () {
    'use strict';

    angular.module('famApp')
        .controller('newItemModalCtrl', ['$scope', '$uibModalInstance', newItemModalCtrl]);

        function newItemModalCtrl ($scope, $uibModalInstance) {
            
            var vm = this;
            
            vm.ok = ok; 
            vm.cancel = cancel;
            
            function ok () {
                //TODO: apply service to add item
            }
            
            function cancel () {
                $uibModalInstance.dismiss();
            }
            
                                    
        }    
}());