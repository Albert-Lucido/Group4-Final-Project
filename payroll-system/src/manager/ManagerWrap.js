// src/manager/ManagerWrap.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';


import Navbar from './ManagerNavbar'; // Assuming you have a ManagerNavbar component
import Sidebar from './ManagerSidebar'; // Assuming you have a ManagerSidebar component
import ManagerDashboard from './ManagerDashboard'; // Assuming you have a ManagerDashboard component
import LeaveManagement from './LeaveManagement'; // Assuming you have a LeaveManagement component
import TimesheetApproval from './TimesheetApproval'; // Assuming you have a TimesheetApproval component
import PayrollSummary from './PayrollSummary'; // Assuming you have a PayrollSummary component

function ManagerWrap() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="manager-dashboard" element={<ManagerDashboard />} />
            <Route path="leave-management" element={<LeaveManagement />} />
            <Route path="timesheet-approval" element={<TimesheetApproval />} />
            <Route path="payroll-summary" element={<PayrollSummary />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ManagerWrap;