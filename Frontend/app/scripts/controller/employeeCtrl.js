'use strict';

angular.module('datis').controller('employeeCtrl', function ($scope, $state, $http, API_URL, employeeService) {
    let dialogModel = function () {
        this.visible = false;
    };
    dialogModel.prototype.open = function (employee, type) {
        this.employee = employee;
        this.visible = true;
        this.type = type;
        if (type === 'update') {
            this.title = 'Edit Configuration';
            this.buttonName = 'Edit';
        } else {
            this.title = 'Add Configuration';
            this.buttonName = 'Add';
        }
    };
    dialogModel.prototype.close = function () {
        this.visible = false;
    };
    $scope.addDialog = new dialogModel();
    $scope.editDialog = new dialogModel();
    $scope.deleteDialog = new dialogModel();

    $scope.addCallback = function (employee) {
        employee.originalName = employee.name;
        $scope.employees.push(employee);
    };

    $scope.editCallback = function (employee) {
        let index = $scope.employees.indexOf(employee);
        if (index !== -1) {
            $scope.employees[index].originalName = employee.name;
        }
    };

    $scope.deleteCallback = function (employee) {
        let index = $scope.employees.indexOf(employee);
        if (index !== -1) {
            $scope.employees.splice(index, 1);
        }
    };

    employeeService.getEmployees().then(function (employees) {
        $scope.employees = employees;
    });
});
