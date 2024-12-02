import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';

import Navbar from './EmployeeNavbar';
import Sidebar from './EmployeeSidebar';
import Dashboard from './EmployeeDashboard';
import LeaveRequests from './LeaveRequests';
import TimesheetEntry from './TimesheetEntry';
import PersonalInfo from './PersonalInfo';
import ViewBenefits from './ViewBenefits';
import Notification from './Notification';

function EmployeeWrap() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="employee-dashboard" element={<Dashboard />} />
            <Route path="leave-requests" element={<LeaveRequests />} />
            <Route path="timesheet-entry" element={<TimesheetEntry />} />
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="view-benefits" element={<ViewBenefits />} />
            <Route path="notification" element={<Notification />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default EmployeeWrap;