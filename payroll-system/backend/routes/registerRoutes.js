// routes/registerRoutes.js
const express = require('express');
const router = express.Router();
const PersonalDetails = require('../models/PersonalDetails');
const Employee = require('../models/Employee'); // Import Employee model
const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcrypt');

// POST route to register a new employee and personal details
router.post('/register', async (req, res) => {
    const {
        personnelId,
        firstName,
        lastName,
        gender,
        maritalStatus,
        nationality,
        address,
        contactNumber,
        validID,
        idNumber,
        bankName,
        bankAccountNo,
        employmentType,
        department,
        position,
        joiningDate,
        profilePhoto,
        password
    } = req.body;

    try {
        // First, check if the personnel ID exists in the User collection
        const existingEmployee = await User.findOne({ personnelId });
        if (!existingEmployee) {
            return res.status(400).json({ message: 'Personnel ID does not exist in User collection.' });
        }

        // Check if personal details already exist for the given personnelId
        const existingDetails = await PersonalDetails.findOne({ personnelId });
        if (existingDetails) {
            return res.status(400).json({ message: 'Personal details already exist for this personnel ID.' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new personal details entry
        const personalDetails = new PersonalDetails({
            personnelId,
            firstName,
            lastName,
            gender,
            maritalStatus,
            nationality,
            address,
            contactNumber,
            validID,
            idNumber,
            bankName,
            bankAccountNo,
            employmentType,
            department,
            position,
            joiningDate,
            profilePhoto,
            password: hashedPassword // Save the hashed password
        });

        await personalDetails.save();

        // Check if there's an existing employee record with the same personnelId
        const existingEmployeeRecord = await Employee.findOne({ personnelId });
        if (existingEmployeeRecord) {
            // Update the employee record with the name
            existingEmployeeRecord.name = `${firstName} ${lastName}`;
            await existingEmployeeRecord.save(); // Save the updated employee record
        }
        
        // Optionally, update the password in the User collection if it was changed
        await User.updateOne({ personnelId }, { password: hashedPassword });

        res.status(201).json({ message: 'Personal details registered successfully.' });
    } catch (error) {
        console.error('Error registering personal details:', error);
        res.status(500).json({ message: 'Error registering personal details', error });
    }
});

// Export the router
module.exports = router;