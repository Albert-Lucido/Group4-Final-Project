import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/LeaveManagement.css";

const LeaveManagement = ({ leaveRequests, updateLeaveStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="leave-management-container">
      <h2>Leave Management</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests?.map((lr) => (
            <tr key={lr.id}>
              <td>{lr.employeeName}</td>
              <td>{lr.leaveDate}</td>
              <td>{lr.reason}</td>
              <td>{lr.status}</td>
              <td>
                <button
                  className="bg-green-500"
                  onClick={() => updateLeaveStatus(lr.id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500"
                  onClick={() => updateLeaveStatus(lr.id, "Rejected")}
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

export default LeaveManagement;
