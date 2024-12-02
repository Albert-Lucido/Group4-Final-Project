// src/manager/LeaveManagement.js
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './css/LeaveManagement.css';

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leave requests from the backend
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave-requests');
      setLeaveRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leave requests:', err);
      setError("Failed to fetch leave requests.");
      setLoading(false);
    }
  };

  // Update leave request status
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/leave-requests/${id}`, { status });
      setLeaveRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error('Error updating leave request status:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  if (loading) return <p>Loading leave requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="leave-management">
      <h3>Leave Management</h3>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length > 0 ? (
            leaveRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.employeeName}</td>
                <td>{request.leaveType}</td>
                <td>{new Date(request.startDate).toLocaleDateString()}</td>
                <td>{new Date(request.endDate).toLocaleDateString()}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
                <td>
                  <button onClick={() => handleStatusUpdate(request._id, 'Approved')}>Approve</button>
                  <button onClick={() => handleStatusUpdate(request._id, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No leave requests available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveManagement;