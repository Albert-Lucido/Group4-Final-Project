// src/manager/PayrollSummary.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/PayrollSummary.css";

const PayrollSummary = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayrollSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payroll-summary');
        setPayrollData(response.data);
      } catch (error) {
        console.error('Error fetching payroll summary:', error);
        setError('Failed to fetch payroll summary. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollSummary();
  }, []);

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error state
  if (error) return <p>{error}</p>;

  return (
    <div className="payroll-summary-container">
      <h2>Payroll Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Total Hours</th>
            <th>Base Salary</th>
            <th>Bonuses</th>
            <th>Total Pay</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((pd) => (
            <tr key={pd.employeeId}>
              <td>{pd.employeeName}</td>
              <td>{pd.totalHours}</td>
              <td>${pd.baseSalary.toFixed(2)}</td>
              <td>${pd.bonuses.toFixed(2)}</td>
              <td>${pd.totalPay.toFixed(2)}</td>
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

export default PayrollSummary;