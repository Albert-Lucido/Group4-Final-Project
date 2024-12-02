import React, { useState, useEffect } from "react";
import axios from "axios";

const PayrollProcessing = () => {
  const [employees, setEmployees] = useState([]);
  const [baseSalary, setBaseSalary] = useState('');
  const [bonuses, setBonuses] = useState('');
  const [deductions, setDeductions] = useState('');
  const [totalHours, setTotalHours] = useState(''); // New state for total hours
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees'); // Fetch employees with roles
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (e) => {
    const employee = employees.find(emp => emp.personnelId === e.target.value);
    setSelectedEmployee(employee ? employee.personnelId : '');
    setSelectedRole(employee ? employee.role : ''); // Set selected role
  };

  const processPayroll = async () => {
    if (baseSalary === '' || bonuses === '' || deductions === '' || totalHours === '') {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const employeeData = {
        personnelId: selectedEmployee,
        baseSalary: parseFloat(baseSalary), // Convert to float
        bonuses: parseFloat(bonuses), // Convert to float
        deductions: parseFloat(deductions), // Convert to float
        totalHours: parseFloat(totalHours) // Include total hours
      };

      // Send a POST request to save employee salary details
      const response = await axios.post('http://localhost:5000/api/payroll', employeeData);
      console.log('Employee salary details saved:', response.data);

      alert("Payroll processed successfully!");
      // Reset the input fields after successful processing
      setBaseSalary('');
      setBonuses('');
      setDeductions('');
      setTotalHours(''); // Reset total hours
      setSelectedEmployee('');
      setSelectedRole(''); // Reset selected role
    } catch (error) {
      console.error('Error processing payroll:', error);
      alert('Error processing payroll. Please try again.');
    }
  };

  return (
    <div>
      <h1>Payroll Processing</h1>
      <h2>Select Employee</h2>
      <select onChange={handleEmployeeChange} value={selectedEmployee}>
        <option value="">Select an Employee</option>
        {employees.map(employee => (
          <option key={employee.personnelId} value={employee.personnelId}>
            {employee.name} - {employee.personnelId} ({employee.role})
          </option>
        ))}
      </select>
  
      <h2>Salary Details</h2>
      <div>
        <label>Total Hours:</label>
        <input
          type="number"
          value={totalHours}
          onChange={(e) => setTotalHours(e.target.value)} // Handle total hours input
          placeholder="Enter total hours"
          required
        />
      </div>
      <div>
        <label>Base Salary:</label>
        <input
          type="number"
          value={baseSalary}
          onChange={(e) => setBaseSalary(e.target.value)}
          placeholder="Enter base salary"
          required
        />
      </div>
      <div>
        <label>Bonuses:</label>
        <input
          type="number"
          value={bonuses}
          onChange={(e) => setBonuses(e.target.value)}
          placeholder="Enter bonuses"
          required
        />
      </div>
      <div>
        <label>Deductions:</label>
        <input
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          placeholder="Enter deductions"
          required
        />
      </div>
      <button onClick={processPayroll}>Process Payroll</button>
    </div>
  );
};

export default PayrollProcessing;