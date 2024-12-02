const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  personnelId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true }, // Add role field
  baseSalary: { type: Number, required: true },
  bonuses: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  totalHours: { type: Number, default: 0 },
});

// Change the collection name here
module.exports = mongoose.model('EmployeeRecords', EmployeeSchema);