(function () {
    'use strict';

    angular.module('famApp')
        .controller('shoppingListCtrl', ['$scope', '$state','$uibModal' ,'shoppingListService', shoppingListCtrl]);

    function shoppingListCtrl($scope, $state, $uibModal, shoppingListService) {
        var vm = this;

        vm.add = add;
        vm.remove = remove;

        shoppingListService.getItems().then(function(res){
            vm.data = res.data;
        }, function(err){
            console.log(err);
        })
                        
        function add () {
            var modalInstance = $uibModal.open({
                templateUrl: 'src/client/app/components/shoppinglist/newItem.html',
                controller: 'newItemModalCtrl',
                controllerAs: 'vm'
            }); 
            
            modalInstance.result.then(function(){
                $state.go('shoppingList', {}, {reload: true});                 
            });
        }
        
        function remove (index) {
            //TODO: Add service to remove from list            
            vm.data.splice(index, 1);
        }

    }
}());