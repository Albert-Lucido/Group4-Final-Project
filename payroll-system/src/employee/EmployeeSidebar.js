import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/leave-requests">Leave Requests</Link></li>
        <li><Link to="/timesheet-entry">Timesheet Entry</Link></li>
        <li><Link to="/personal-info">Personal Information</Link></li>
        <li><Link to="/view-benefits">View Benefits</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
