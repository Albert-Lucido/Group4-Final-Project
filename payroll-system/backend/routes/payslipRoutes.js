// c:\Users\Albert Lucido\Desktop\final-project-4-webdevt\payroll-system\backend\routes\payslipRoutes.js
const express = require('express');
const router = express.Router();
const Payslip = require('../models/Payslip'); // Assuming you have a Payslip model

// POST route to generate payslips
router.post('/payslips', async (req, res) => {
  try {
    const payslips = req.body;

    // Save payslips to the database
    await Payslip.insertMany(payslips);
    res.status(201).json({ message: 'Payslips generated successfully' });
  } catch (error) {
    console.error('Error generating payslips:', error);
    res.status(500).json({ message: 'Error generating payslips', error });
  }
});

// GET route to fetch payslips for an employee
router.get('/payslips/:personnelId', async (req, res) => {
  try {
    const { personnelId } = req.params;
    const payslips = await Payslip.find({ employeeId: personnelId });
    res.json(payslips);
  } catch (error) {
    console.error('Error fetching payslips:', error);
    res.status(500).json({ message: 'Error fetching payslips', error });
  }
});

module.exports = router;