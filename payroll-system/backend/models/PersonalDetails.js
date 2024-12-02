// models/PersonalDetails.js
const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  personnelId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  validID: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  bankAccountNo: {
    type: String,
    required: true
  },
  employmentType: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true // You may want to change this to a more suitable type if you're handling files differently
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('PersonalDetails', PersonalDetailsSchema);