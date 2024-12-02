const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const PayrollSummary = require('../models/PayrollSummary'); // Import PayrollSummary model
const Salary = require('../models/Salary'); // Import Salary model
const Timesheet = require('../models/Timesheet'); // Import Timesheet model



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

router.patch('/employees/:personnelId', async (req, res) => {
    const { personnelId } = req.params;
    const { totalHours } = req.body;

    try {
        // Find the employee by personnelId
        const employeeRecord = await Employee.findOne({ personnelId });
        if (!employeeRecord) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // Update the totalHours field
        employeeRecord.totalHours = (employeeRecord.totalHours || 0) + totalHours; // Add to existing totalHours
        const savedRecord = await employeeRecord.save();
        res.status(200).json(savedRecord);
    } catch (error) {
        console.error('Error updating total hours:', error);
        res.status(500).json({ message: 'Error updating total hours', error });
    }
});

router.post('/payroll', async (req, res) => {
    const { personnelId, baseSalary, bonuses, deductions, totalHours } = req.body;

    // Validate incoming data
    if (!personnelId || baseSalary === undefined || bonuses === undefined || deductions === undefined || totalHours === undefined) {
        return res.status(400).json({ message: 'Personnel ID, base salary, bonuses, and deductions are required.' });
    }

    try {
        // Calculate net salary
        const netSalary = baseSalary + bonuses - deductions;

        // Find the employee by personnelId
        const employeeRecord = await Employee.findOne({ personnelId });
        if (!employeeRecord) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // Update the employee record with salary details
        employeeRecord.totalHours = totalHours;
        employeeRecord.baseSalary = baseSalary;
        employeeRecord.bonuses = bonuses;
        employeeRecord.deductions = deductions;

        const savedRecord = await employeeRecord.save();

        // Save the salary details to the Salary collection
        const salaryRecord = new Salary({
            personnelId,
            baseSalary,
            bonuses,
            deductions,
            netSalary,
        });

        await salaryRecord.save(); // Save to the Salary collection

        res.status(201).json({ employee: savedRecord, salary: salaryRecord });
    } catch (error) {
        console.error('Error processing payroll:', error);
        res.status(500).json({ message: 'Error processing payroll', error });
    }
});

router.get('/payroll-summary', async (req, res) => {
    try {
        const employees = await Employee.find();
        const payrollSummaries = await Promise.all(employees.map(async (employee) => {
            const salary = await Salary.findOne({ personnelId: employee.personnelId });
            return {
                employeeId: employee.personnelId,
                employeeName: employee.name,
                totalHours: employee.totalHours,
                baseSalary: salary ? salary.baseSalary : 0,
                bonuses: salary ? salary.bonuses : 0,
                totalPay: (salary ? salary.baseSalary : 0) + (salary ? salary.bonuses : 0) - (salary ? salary.deductions : 0),
            };
        }));

        res.json(payrollSummaries);
    } catch (error) {
        console.error('Error fetching payroll summary:', error);
        res.status(500).json({ message: 'Error fetching payroll summary' });
    }
});



module.exports = router;