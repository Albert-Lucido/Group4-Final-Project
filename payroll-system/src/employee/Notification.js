import React from 'react';

function Notification() {
  return (
    <div className="notification">
      <h4>Latest Notifications</h4>
      <ul>
        <li>Reminder: Submit your timesheets for this week!</li>
        <li>Leave approval for your recent request: Pending</li>
        <li>Your personal info is updated successfully.</li>
      </ul>
    </div>
  );
}

export default Notification;
