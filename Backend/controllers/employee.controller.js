const Employee = require('../models/employee.model');

exports.get = function (req, res) {
    Employee.find({}, function (err, employeeList) {
        if (err) {
            res.status(500).send({message: 'Cannot retrieve employee information..!!'});
            return next(err);
        }
        let employees = [];
        employeeList.forEach(function (employee) {
            employees.push(employee);
        });
        res.status(200).send(JSON.stringify(employees));
    });
};

exports.getById = function (req, res) {
    let employeeId = req.params.id || null;

    Employee.find({name: employeeId}, function (err, employee) {
        if (err) {
            res.status(500).send({message: 'Cannot retrieve employee information..!!'});
            return next(err);
        }
        res.status(200).send(employee);
    });
};

exports.create = function (req, res) {
    let employee = new Employee(
        {
            name: req.body.name,
            base: req.body.base,
            deduction: req.body.deduction
        }
    );

    employee.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Employee created successfully')
    });
};

exports.update = function (req, res) {
    let employeeId = req.params.id || null;

    Employee.findOne({name: employeeId}, function (err, employee) {
        if (err) {
            return next(err);
        }

        employee.name = req.body.name || employee.name;
        employee.base = req.body.base || employee.base;
        employee.deduction = req.body.deduction || employee.deduction;

        employee.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Employee updated successfully')
        })
    });
};

exports.delete = function (req, res) {
    let employeeId = req.params.id || null;
    if (employeeId === null) {
        res.status(404).send({message: 'Employee ID missing..!!'});
        return;
    }

    Employee.deleteOne({name: employeeId}, function (err) {
        if (err) {
            return next(err);
        }
        res.send('Employee deleted successfully!');
    })
};
