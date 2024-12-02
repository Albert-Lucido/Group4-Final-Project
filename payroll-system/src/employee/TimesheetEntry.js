// src/employee/TimesheetEntry.js
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// Validation schema using Yup
const schema = Yup.object().shape({
  hoursWorked: Yup.number()
    .required("Hours worked is required")
    .positive("Hours worked must be a positive number")
    .integer("Hours worked must be an integer")
    .min(1, "Hours worked cannot be zero or negative"),
  taskDescription: Yup.string().required("Task description is required")
});

const TimesheetEntry = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const employeeId = localStorage.getItem('personnelId'); // Get personnelId from local storage
    const timesheetData = { ...data, employeeId }; // Combine the form data with personnelId

    try {
      const response = await axios.post('http://localhost:5000/api/timesheets', timesheetData); // Ensure the correct API endpoint
      alert('Timesheet submitted successfully!'); // Notify success
      console.log('Response:', response.data); // Log the response data
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error submitting timesheet:', error.response.data);
        alert('Error submitting timesheet: ' + (error.response.data.message || 'An error occurred.'));
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error submitting timesheet:', error.request);
        alert('Error submitting timesheet: No response from server.');
      } else {
        // Something happened in setting up the request
        console.error('Error submitting timesheet:', error.message);
        alert('Error submitting timesheet: ' + error.message);
      }
    }
  };

  return (
    <div className="timesheet-entry">
      <h3>Timesheet Entry</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="number"
            {...register("hoursWorked")}
            placeholder="Hours Worked"
          />
          {errors.hoursWorked && <p className="error-message">{errors.hoursWorked.message}</p>}
        </div>
        <div>
          <input
            type="text"
            {...register("taskDescription")}
            placeholder="Task Description"
          />
          {errors.taskDescription && <p className="error-message">{errors.taskDescription.message}</p>}
        </div>
        <button type="submit">Submit Timesheet</button>
      </form>
    </div>
  );
};

export default TimesheetEntry;