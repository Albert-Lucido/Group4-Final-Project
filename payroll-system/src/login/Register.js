// src/login/Register.js
import React, { useState } from 'react';
import './Register.css'
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    personnelId: '',
    firstName: '',
    lastName: '',
    gender: '',
    maritalStatus: '',
    nationality: '',
    address: '',
    contactNumber: '',
    validID: '',
    idNumber: '',
    bankName: '',
    bankAccountNo: '',
    employmentType: '',
    department: '',
    position: '',
    joiningDate: '',
    profilePhoto: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Ensure all fields are filled
        for (const key in formData) {
            if (!formData[key]) {
                return alert(`${key} is required`);
            }
        }

        // Register personal details
        const response = await axios.post('http://localhost:5000/api/register', formData);
        console.log('Registration response:', response.data); // Log the response

        // Update password in User collection if it was changed
        await axios.put(`http://localhost:5000/api/update-password`, {
            personnelId: formData.personnelId,
            password: formData.password,
        });

        // Redirect to employee wrap after successful registration
        window.location.href = '/employee';
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.'); // This alert can be more specific based on error
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="personnelId" placeholder="Personnel ID" value={formData.personnelId} onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="maritalStatus" placeholder="Marital Status" value={formData.maritalStatus} onChange={handleChange} required />
        <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <input type="text" name="validID" placeholder="Valid ID" value={formData.validID} onChange={handleChange} required />
        <input type="text" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} required />
        <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} required />
        <input type="text" name="bankAccountNo" placeholder="Bank Account No" value={formData.bankAccountNo} onChange={handleChange} required />
        <input type="text" name="employmentType" placeholder="Employment Type" value={formData.employmentType} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
        <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
        <input type="text" name="profilePhoto" placeholder="Profile Photo URL" value={formData.profilePhoto} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;