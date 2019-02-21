const express = require('express');
const employee = express.Router();
const employeeCtrl = require('../controllers/employee.controller');

employee.get('/', employeeCtrl.get);

employee.get('/:id', employeeCtrl.getById);

employee.post('/create', employeeCtrl.create);

employee.put('/:id/update', employeeCtrl.update);

employee.delete('/:id', employeeCtrl.delete);

module.exports = employee;
