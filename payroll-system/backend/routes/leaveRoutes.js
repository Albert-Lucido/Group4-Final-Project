// backend/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');

// POST route to create a leave request
router.post('/leave-requests', async (req, res) => {
  const { employeeId, employeeName, leaveType, startDate, endDate, reason } = req.body;

  const leaveRequest = new LeaveRequest({
    employeeId,
    employeeName,
    leaveType,
    startDate,
    endDate,
    reason,
  });

  try {
    const savedRequest = await leaveRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating leave request:', error);
    res.status(500).json({ message: 'Error creating leave request', error });
  }
});

// GET route to fetch all leave requests
router.get('/leave-requests', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.json(leaveRequests);
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ message: 'Error fetching leave requests', error });
  }
});

// PATCH route to update leave request status
router.patch('/leave-requests/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const updatedRequest = await LeaveRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedRequest);
  } catch (error) {
    console.error('Error updating leave request:', error);
    res.status(500).json({ message: 'Error updating leave request', error });
  }
});

module.exports = router;