import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/TimesheetApproval.css";

const TimesheetApproval = ({ timesheets, updateTimesheetStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="timesheet-approval-container">
      <h2>Timesheet Approval</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheets?.map((ts) => (
            <tr key={ts.id}>
              <td>{ts.employeeName}</td>
              <td>{ts.date}</td>
              <td>{ts.hoursWorked}</td>
              <td>{ts.status}</td>
              <td>
                <button
                  className="bg-green-500"
                  onClick={() => updateTimesheetStatus(ts.id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500"
                  onClick={() => updateTimesheetStatus(ts.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default TimesheetApproval;
