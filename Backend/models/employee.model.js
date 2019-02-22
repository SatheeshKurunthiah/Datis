const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    base: {
        type: Number,
        required: true
    },
    deduction: {
        type: Array,
        required: true
    },
    takeHome: {
        type: Number,
        required: false
    }
});

let calculateDeduction = function (base, deductions) {
    let deductionSum = 0;

    deductions.forEach(function (d) {
        deductionSum += parseInt(d);
    });

    return deductionSum;
};

// Calculate take home salary before storing the employee in DB
EmployeeSchema.pre('save', function (next) {
    let item = this;

    let deductionSum = calculateDeduction(item.base, item.deduction);

    if (deductionSum <= item.base) {
        item.takeHome = item.base - deductionSum;
        next();
    } else {
        console.log('Deduction is more than base pay..!!');
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
