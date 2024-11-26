import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function AdminSidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/user-management">User  Management</Link>
        </li>
        <li>
          <Link to="/payroll-processing">Payroll Processing</Link>
        </li>
        <li>
          <Link to="/reporting-analytics">Reporting & Analytics</Link>
        </li>
        <li>
          <Link to="/system-settings">System Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;