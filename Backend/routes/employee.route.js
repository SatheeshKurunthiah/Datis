const express = require('express');
const employee = express.Router();
const employeeCtrl = require('../controllers/employee.controller');

/* Returns all employees */
employee.get('/', employeeCtrl.get);

/* Returns employee by given id (Name) */
employee.get('/:id', employeeCtrl.getById);

/* Creates a new employee */
employee.post('/create', employeeCtrl.create);

/* Edit employee with new values filtered bu id (Name) */
employee.put('/:id/update', employeeCtrl.update);

/* Deletes the employee by given id (Name) */
employee.delete('/:id', employeeCtrl.delete);

module.exports = employee;
