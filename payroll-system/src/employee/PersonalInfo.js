// src/employee/PersonalInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/PersonalInfo.css';

const PersonalInfo = () => {
  const [personalDetails, setPersonalDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch personal details on component mount
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      const personnelId = localStorage.getItem('personnelId'); // Get personnelId from local storage
      if (!personnelId) {
        setError('Personnel ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/Details?personnelId=${personnelId}`);
        if (response.data.length > 0) {
          setPersonalDetails(response.data[0]); // Assuming the response is an array
        } else {
          setError('No personal details found for this personnel ID.');
        }
      } catch (err) {
        console.error('Error fetching personal details:', err);
        setError('Error fetching personal details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalDetails();
  }, []);

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error state
  if (error) return <p>{error}</p>;

  // Render personal details
  return (
    <div className="personal-info">
      <h3>Personal Information</h3>
      {personalDetails ? (
        <div className="info-container">
          <div className="info-block">
            <p><strong>First Name:</strong> {personalDetails.firstName}</p>
            <p><strong>Last Name:</strong> {personalDetails.lastName}</p>
            <p><strong>Gender:</strong> {personalDetails.gender}</p>
            <p><strong>Marital Status:</strong> {personalDetails.maritalStatus}</p>
            <p><strong>Nationality:</strong> {personalDetails.nationality}</p>
            <p><strong>Bank Name:</strong> {personalDetails.bankName}</p>
            <p><strong>Bank Account No:</strong> {personalDetails.bankAccountNo}</p>
          </div>
          <div className="info-block">
            <p><strong>Address:</strong> {personalDetails.address}</p>
            <p><strong>Contact Number:</strong> {personalDetails.contactNumber}</p>
            <p><strong>Valid ID:</strong> {personalDetails.validID}</p>
            <p><strong>ID Number:</strong> {personalDetails.idNumber}</p>
            <p><strong>Position:</strong> {personalDetails.position}</p>
            <p><strong>Joining Date:</strong> {new Date(personalDetails.joiningDate).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p>No personal details available.</p>
      )}
    </div>
  );
};

export default PersonalInfo;