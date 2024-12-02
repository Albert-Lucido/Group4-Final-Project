import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/ManagerDashboard.css";

const ManagerDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Manager Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/timesheet-approval" className="dashboard-link">
          Timesheet Approval
        </Link>
        <Link to="/leave-management" className="dashboard-link">
          Leave Management
        </Link>
        <Link to="/payroll-summary" className="dashboard-link">
          Payroll Summary
        </Link>
      </div>
    </div>
  );
};

export default ManagerDashboard;
