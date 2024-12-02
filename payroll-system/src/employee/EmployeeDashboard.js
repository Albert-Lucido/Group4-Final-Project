import React from 'react';
import Notification from './Notification';
import './css/EmployeeDashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Notification />
      <h3>Welcome to your Employee Dashboard</h3>
    </div>
  );
}

export default Dashboard;
