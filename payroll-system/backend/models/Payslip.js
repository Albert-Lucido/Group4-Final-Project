// c:\Users\Albert Lucido\Desktop\final-project-4-webdevt\payroll-system\backend\models\Payslip.js
const mongoose = require('mongoose');

const PayslipSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
 grossPay: { type: Number, required: true },
  totalDeductions: { type: Number, required: true },
  netPay: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Payslip = mongoose.model('Payslip', PayslipSchema);
module.exports = Payslip;