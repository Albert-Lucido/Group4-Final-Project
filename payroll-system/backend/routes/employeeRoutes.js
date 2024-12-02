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
router.post('/employees/salary', async (req, res) => {
    const { personnelId, baseSalary, bonuses, deductions } = req.body;

    try {
        const employee = await Employee.findOne({ personnelId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.baseSalary = baseSalary;
        employee.bonuses = bonuses;
        employee.deductions = deductions;

        const updatedEmployee = await employee.save();
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error('Error saving employee salary details:', error);
        res.status(500).json({ message: 'Error saving employee salary details', error });
    }
});

module.exports = router;