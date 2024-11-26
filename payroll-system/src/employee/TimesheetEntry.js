import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema using Yup
const schema = Yup.object().shape({
  hoursWorked: Yup.number()
    .required("Hours worked is required")
    .positive("Hours worked must be a positive number")
    .integer("Hours worked must be an integer")
    .min(1, "Hours worked cannot be zero or negative"), // Ensure hours worked is at least 1
  taskDescription: Yup.string().required("Task description is required"),
});

function TimesheetEntry() {
  const [notification, setNotification] = useState("");  // For storing notification message
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Trigger any actions (like submitting data to an API)
    alert("Timesheet entry submitted!");
    console.log(data);

    // Set the notification
    setNotification("Your timesheet entry has been successfully submitted.");

    // Reset form fields
    reset();
  };

  return (
    <div className="timesheet-entry">
      <h3>Submit Timesheet Entry</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Wrapper for Hours Worked */}
        <div className={`input-wrapper ${errors.hoursWorked ? 'error' : ''}`}>
          <label>Hours Worked</label>
          <input type="number" {...register("hoursWorked")} />
          {errors.hoursWorked && <p className="error-message">{errors.hoursWorked.message}</p>}
        </div>

        {/* Wrapper for Task Description */}
        <div className={`input-wrapper ${errors.taskDescription ? 'error' : ''}`}>
          <label>Task Description</label>
          <input type="text" {...register("taskDescription")} />
          {errors.taskDescription && <p className="error-message">{errors.taskDescription.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Show Notification */}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default TimesheetEntry;
