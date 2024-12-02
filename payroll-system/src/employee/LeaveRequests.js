// src/employee/LeaveRequests.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// Get the current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

// Validation schema using Yup
const schema = Yup.object().shape({
  leaveType: Yup.string().required("Leave type is required"),
  startDate: Yup.date()
    .required("Start date is required")
    .nullable()
    .min(currentDate, "Start date cannot be in the past"),
  endDate: Yup.date()
    .required("End date is required")
    .nullable()
    .typeError("End date must be a valid date")
    .test("endDateAfterStartDate", "End date must be later than start date", function(value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return new Date(value) > new Date(startDate);
    }),
  reason: Yup.string().required("Reason is required"),
});

function LeaveRequests() {
  const [notification, setNotification] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const employeeId = localStorage.getItem('personnelId'); // Get personnelId from local storage
    const employeeName = "Employee Name"; // Replace with actual employee name if available

    try {
      const response = await axios.post('http://localhost:5000/api/leave-requests', {
        employeeId,
        employeeName,
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
      });

      setNotification("Your leave request has been successfully submitted.");
      reset(); // Reset form fields
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setNotification('Error submitting leave request. Please try again.');
    }
  };

  return (
    <div className="leave-requests">
      <h3>Submit Leave Request</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Leave Type</label>
          <input type="text" {...register("leaveType")} />
          <p>{errors.leaveType?.message}</p>
        </div>

        <div>
          <label>Start Date</label>
          <input type="date" {...register("startDate")} />
          <p>{errors.startDate?.message}</p>
        </div>

        <div>
          <label>End Date</label>
          <input type="date" {...register("endDate")} />
          <p>{errors.endDate?.message}</p>
        </div>

        <div>
          <label>Reason</label>
          <textarea {...register("reason")} />
          <p>{errors.reason?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Show Notification */}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default LeaveRequests;