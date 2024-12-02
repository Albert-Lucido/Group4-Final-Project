// src/manager/ManagerSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function ManagerSidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/manager/manager-dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/manager/leave-management">Leave Management</Link>
        </li>
        <li>
          <Link to="/manager/timesheet-approval">Timesheet Approval</Link>
        </li>
        <li>
          <Link to="/manager/payroll-summary">Payroll Summary</Link>
        </li>
      </ul>
    </div>
  );
}

export default ManagerSidebar;