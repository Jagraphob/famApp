(function () {
    'use strict';

    angular.module('famApp')
        .controller('shoppingListCtrl', ['$scope', '$state', '$uibModal', 'shoppingListService', shoppingListCtrl]);

    function shoppingListCtrl($scope, $state, $uibModal, shoppingListService) {
        var vm = this;

        vm.add = add;
        vm.remove = remove;

        getList();

        function add() {
            var modalInstance = $uibModal.open({
                templateUrl: 'src/client/app/components/shoppinglist/newItem.html',
                controller: 'newItemModalCtrl',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function () {
                $state.go('shoppingList', {}, {
                    reload: true
                });
            });
        }

        function remove(index) {

            console.log(vm.data[index]._id);
            shoppingListService.removeItem(vm.data[index]._id)
                .then(function (res) {
                    getList();
                }, function (err) {
                    console.log(err);
                });
        }

        function getList() {
            shoppingListService.getItems().then(function (res) {
                vm.data = res.data;
                console.log(vm.data);
            }, function (err) {
                console.log(err);
            })
        }

    }
}());