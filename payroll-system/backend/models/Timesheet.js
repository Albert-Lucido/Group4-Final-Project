const mongoose = require('mongoose');

const TimesheetSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  date: { type: Date, required: true },
  hoursWorked: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  taskDescription: { type: String, required: true }
});

module.exports = mongoose.model('Timesheet', TimesheetSchema);