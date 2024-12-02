// src/manager/TimesheetApproval.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimesheetApproval = () => {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/timesheets'); // Fetch all timesheets
        setTimesheets(response.data);
      } catch (error) {
        console.error('Error fetching timesheets', error);
      }
    };

    fetchTimesheets();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      await axios.patch(`/api/timesheets/${id}`, { status }); // Update timesheet status
      setTimesheets(timesheets.map(ts => ts._id === id ? { ...ts, status } : ts));
    } catch (error) {
      console.error('Error updating timesheet status', error);
    }
  };

  return (
    <div>
      <h2>Timesheet Approval</h2>
      <ul>
        {timesheets.map(ts => (
          <li key={ts._id}>
            {ts.hoursWorked} hours - {ts.taskDescription} 
            <button onClick={() => handleApproval(ts._id, 'approved')}>Approve</button>
            <button onClick={() => handleApproval(ts._id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimesheetApproval;