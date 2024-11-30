const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  personnelId: { type: String, required: true }, // Ensure this field is present
  role: { type: String, required: true },        // Ensure this field is present
  password: { type: String, required: true },    // Ensure this field is present
});

// Ensure the model name matches your collection name
module.exports = mongoose.model('employees', UserSchema); // 'Employee' will map to 'EmployeeCollection'