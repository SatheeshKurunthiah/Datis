const express = require('express');
const router = express.Router();
const employee = require('./employee.route');

router.get('/', function (req, res) {
    res.status(200).send({message: 'Server is running..!!'});
});

/* Redirect all routs starting with /employee */
router.use('/employee', employee);

module.exports = router;
