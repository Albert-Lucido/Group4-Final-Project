import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/employee/employee-dashboard">Dashboard</Link></li>
        <li><Link to="/employee/leave-requests">Leave Requests</Link></li>
        <li><Link to="/employee/timesheet-entry">Timesheet Entry</Link></li>
        <li><Link to="/employee/personal-info">Personal Information</Link></li>
        <li><Link to="/employee/view-benefits">View Benefits</Link></li>
        <li><Link to="/">Log Off</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
