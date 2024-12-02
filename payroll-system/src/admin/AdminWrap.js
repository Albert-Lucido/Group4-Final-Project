import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';

import Navbar from './AdminNavbar';
import Sidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import PayrollProcessing from './PayrollProcessing';
import ReportingAnalytics from './ReportingAnalytics';
import SystemSettings from './SystemSettings';

function AdminWrap() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="payroll-processing" element={<PayrollProcessing />} />
            <Route path="reporting-analytics" element={<ReportingAnalytics />} />
            <Route path="system-settings" element={<SystemSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminWrap;