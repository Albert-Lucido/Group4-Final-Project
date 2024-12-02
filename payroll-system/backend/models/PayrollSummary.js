// c:\Users\Albert Lucido\Desktop\final-project-4-webdevt\payroll-system\backend\models\PayrollSummary.js
const mongoose = require('mongoose');

const PayrollSummarySchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    totalHours: { type: Number, required: true },
    baseSalary: { type: Number, required: true },
    bonuses: { type: Number, required: true },
    totalPay: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PayrollSummary', PayrollSummarySchema);