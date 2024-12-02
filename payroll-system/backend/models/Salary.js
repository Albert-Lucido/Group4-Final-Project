const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  personnelId: { type: String, required: true },
  baseSalary: { type: Number, required: true },
  bonuses: { type: Number, required: true },
  deductions: { type: Number, required: true },
  netSalary: { type: Number, required: true },
});

module.exports = mongoose.model('Salary', SalarySchema);