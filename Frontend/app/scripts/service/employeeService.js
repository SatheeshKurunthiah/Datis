'use strict';

angular.module('datis').factory('employeeService', ['$http', 'API_URL', function ($http, API_URL) {
    let getEmployees = function () {
        return $http.get(API_URL + 'employee').then(function (res) {
            let employees = [];
            res.data.forEach(function (employee) {
                employees.push({
                    originalName: employee.name,
                    name: employee.name,
                    base: employee.base,
                    medical: employee.deduction[0],
                    dental: employee.deduction[1],
                    '401k': employee.deduction[2],
                    takeHome: employee.takeHome,
                });
            });
            return employees;
        }, function (err) {
            console.log(err);
            return null;
        });
    };

    let addEmployee = function (employee) {
        return $http.post(API_URL + 'employee/create', employee);
    };

    let updateEmployee = function (employee) {
        return $http.put(API_URL + 'employee/' + employee.originalName + '/update', employee);
    };

    let deleteEmployee = function (employee) {
        return $http.delete(API_URL + 'employee/' + employee.originalName);
    };

    return {
        addEmployee: addEmployee,
        getEmployees: getEmployees,
        updateEmployee: updateEmployee,
        deleteEmployee: deleteEmployee
    };
}]);
