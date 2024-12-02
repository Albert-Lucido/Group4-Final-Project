const express = require('express');
const PersonalDetails = require('../models/PersonalDetails');
const User = require('../models/user'); // Ensure this points to your user model
const router = express.Router();
const bcrypt = require('bcrypt');

// Get all users or check if a user exists by personnelId
router.get('/users', async (req, res) => {
    const { personnelId } = req.query; // Get personnelId from query parameters
    try {
        if (personnelId) {
            const users = await User.find({ personnelId }); // Find users with the matching personnelId
            return res.json(users);
        }
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new user
router.post('/users', async (req, res) => {
    const { personnelId, role, password } = req.body;
    const user = new User({ personnelId, role, password });

    // Validate that all fields are provided
    if (!personnelId || !role || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the personnelId already exists
        const existingUser  = await User.findOne({ personnelId });
        if (existingUser ) {
            return res.status(400).json({ message: 'Personnel ID already exists. Please use a different ID.' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword; // Set the hashed password

        const savedUser  = await user.save();
        res.status(201).json(savedUser );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Optional: Add a DELETE route to remove users
router.delete('/users/:id', async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User  not found');

        // Delete the personal details associated with the personnelId
        const deleteDetails = await PersonalDetails.deleteOne({ personnelId: user.personnelId });
        if (deleteDetails.deletedCount === 0) {
            console.log('No personal details found for this personnel ID.');
        }

        // Delete the user from the User collection
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User  and associated personal details deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { personnelId, password } = req.body;

    console.log('Login attempt:', { personnelId, password }); // Log the incoming data

    try {
        // Find the user by personnelId
        const user = await User.findOne({ personnelId });
        console.log('User  found:', user); // Log the found user

        // Check if user exists and if password matches
        if (user) {
            // Use bcrypt to compare the plain password with the hashed password
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Check if personal details exist for the given personnelId
                const personalDetails = await PersonalDetails.findOne({ personnelId });
                console.log('Personal details found:', personalDetails); // Log personal details

                if (!personalDetails) {
                    return res.json({ success: true, role: user.role, personalDetailsExists: false });
                }
                return res.json({ success: true, role: user.role, personalDetailsExists: true });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'An error occurred during login' });
    }
});

// Update password route
router.put('/update-password', async (req, res) => {
    const { personnelId, password } = req.body;

    try {
        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Update the password in the User collection
        const result = await User.updateOne({ personnelId }, { password: hashedPassword });

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'User  not found or password not changed.' });
        }

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Error updating password', error });
    }
});

router.get('/Details', async (req, res) => {
    const { personnelId } = req.query; // Get personnelId from query parameters
    try {
        if (!personnelId) {
            return res.status(400).json({ message: 'Personnel ID is required.' });
        }

        const personalDetails = await PersonalDetails.find({ personnelId });
        if (personalDetails.length === 0) {
            return res.status(404).json({ message: 'No personal details found for this personnel ID.' });
        }

        res.json(personalDetails);
    } catch (error) {
        console.error('Error fetching personal details:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});





module.exports = router;