const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET route to fetch all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Error fetching employees' });
    }
});

// POST route to save employee salary details
router.post('/employees', async (req, res) => {
    const { personnelId, name, role, baseSalary, bonuses, deductions, totalHours } = req.body;

    const employeeRecord = new Employee({
        personnelId,
        name,
        role,
        baseSalary,
        bonuses,
        deductions,
        totalHours,
    });

    try {
        const savedRecord = await employeeRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        console.error('Error saving employee record:', error);
        res.status(500).json({ message: 'Error saving employee record', error });
    }
});

// New route to process payroll
router.post('/payroll', async (req, res) => {
    const { personnelId, baseSalary, bonuses, deductions } = req.body;

    // Validate incoming data
    if (!personnelId || baseSalary === undefined || bonuses === undefined || deductions === undefined) {
        return res.status(400).json({ message: 'Personnel ID, base salary, bonuses, and deductions are required.' });
    }

    try {
        // Find the employee by personnelId
        const employeeRecord = await Employee.findOne({ personnelId });
        if (!employeeRecord) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // Update the employee record with salary details
        employeeRecord.baseSalary = baseSalary;
        employeeRecord.bonuses = bonuses;
        employeeRecord.deductions = deductions;

        const savedRecord = await employeeRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        console.error('Error processing payroll:', error);
        res.status(500).json({ message: 'Error processing payroll', error });
    }
});

module.exports = router;