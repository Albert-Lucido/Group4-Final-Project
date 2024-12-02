const express = require('express');
const router = express.Router();
const Timesheet = require('../models/Timesheet');

// POST route to submit a timesheet
router.post('/timesheets', async (req, res) => {
  const { employeeId, employeeName, date, hoursWorked, taskDescription } = req.body;

  const timesheet = new Timesheet({
    employeeId,
    employeeName,
    date,
    hoursWorked,
    taskDescription
  });

  try {
    const savedTimesheet = await timesheet.save();
    res.status(201).json(savedTimesheet);
  } catch (error) {
    res.status(500).json({ message: 'Error saving timesheet', error });
  }
});

// GET route to fetch all timesheets for approval
router.get('/timesheets', async (req, res) => {
  try {
    const timesheets = await Timesheet.find();
    res.json(timesheets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timesheets', error });
  }
});

// PATCH route to update timesheet status
router.patch('/timesheets/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const updatedTimesheet = await Timesheet.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedTimesheet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating timesheet', error });
  }
});

module.exports = router;