(function () {
    'use strict';

    angular.module('famApp')
        .controller('shoppingListCtrl', ['$scope', '$uibModal', shoppingListCtrl]);

    function shoppingListCtrl($scope, $uibModal) {
        var vm = this;

        vm.data = [
            {
                "type": "Food",
                "item": "Milk",
                "amount": 1,
                "unit": "ea",
                "remark": ""
                   },
            {
                "type": "Food",
                "item": "Eggs",
                "amount": 1,
                "unit": "pack",
                "remark": "12 per pack"
                   },
            {
                "type": "Food",
                "item": "Bacon",
                "amount": 500,
                "unit": "mg",
                "remark": ""
                   },
            {
                type: "Hardware",
                item: "Sofa",
                amount: 1,
                "unit": "ea"
                }
            
        ];

        vm.add = add;
        vm.remove = remove;

        function add () {
            var modalInstance = $uibModal.open({
                templateUrl: 'src/client/app/components/shoppinglist/newItem.html',
                controller: 'newItemModalCtrl',
                controllerAs: 'vm'
            });                        
        }
        
        function remove (index) {
            //TODO: Add service to remove from list            
            vm.data.splice(index, 1);
        }

    }
}());