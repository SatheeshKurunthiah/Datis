'use strict';

angular.module('datis').directive('deleteEmployeeDialog', ['employeeService', function (employeeService) {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            callback: '&'
        },
        link: function (scope, element, attributes) {
            scope.$watch('model.visible', function (newValue) {
                var modalElement = element.find('.modal');
                modalElement.modal(newValue ? 'show' : 'hide');
            });

            scope.onDelete = function (employee) {
                employeeService.deleteEmployee(employee).then(function (res) {
                    scope.callback({
                        employee: employee
                    });
                    console.log(res.data.message);
                });
            };

            element.on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.model.visible = true;
                });
            });

            element.on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.model.visible = false;
                });
            });

        },
        templateUrl: '../../views/employeeDelete.html',
    };
}]);
