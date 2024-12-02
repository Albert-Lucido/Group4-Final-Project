import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function AdminSidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/admin/admin-dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/user-management">User  Management</Link>
        </li>
        <li>
          <Link to="/admin/payroll-processing">Payroll Processing</Link>
        </li>
        <li>
          <Link to="/admin/reporting-analytics">Reporting & Analytics</Link>
        </li>
        <li>
          <Link to="/">Log Off</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;