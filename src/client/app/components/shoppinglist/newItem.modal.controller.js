(function () {
    'use strict';

    angular.module('famApp')
        .controller('newItemModalCtrl', ['$scope', '$uibModalInstance', 'shoppingListService', newItemModalCtrl]);

    function newItemModalCtrl($scope, $uibModalInstance, shoppingListService) {

        var vm = this;

        vm.newData = {};
        //vm.createData.amount = 0;

        vm.types = ["Food", "Groceries", "Houseware"];
        vm.units = ["ea", "pack", "bunch", "grams", "kgs"];
            
        vm.errorMessage = "";
        
        vm.ok = ok;
        vm.cancel = cancel;
        vm.amountPlus = amountPlus;
        vm.amountMinus = amountMinus;

        function ok() {
            shoppingListService.newItem(vm.newData)
                .then(function (res) {
                    $uibModalInstance.close();
                }, function (err) {
                    console.log(err);
                    vm.errorMessage = err;
                });
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function amountPlus() {
            if (vm.newData.amount === undefined) {
                vm.newData.amount = 1;
            } else {
                vm.newData.amount += 1;
            }
        }

        function amountMinus() {
            if (vm.newData.amount >= 1)
                vm.newData.amount -= 1;
        }

    }
}());