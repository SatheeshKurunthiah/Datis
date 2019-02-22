'use strict';

angular.module('datis').directive('employeeForm', ['employeeService', function (employeeService) {
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

            scope.onUpdate = function (employee) {
                if (this.model.type === 'update') {
                    employeeService.updateEmployee(employee).then(function (res) {
                        employee.takeHome = res.data.takeHome;
                        scope.callback({
                            employee: employee,
                        });
                        console.log(res.data.message);
                    });
                } else {
                    employeeService.addEmployee(employee).then(function (res) {
                        scope.callback({
                            employee: employee,
                        });
                        console.log(res.data.message);
                    });
                }
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
        templateUrl: '../../views/employeeForm.html',
    };
}]);
