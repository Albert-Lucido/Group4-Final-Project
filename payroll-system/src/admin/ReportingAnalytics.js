// c:\Users\Albert Lucido\Desktop\final-project-4-webdevt\payroll-system\src\manager\PayrollSummary.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PayrollSummary = () => {
  const [payrollData, setPayrollData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayrollSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payroll-summary');
        setPayrollData(response.data);
      } catch (error) {
        console.error('Error fetching payroll summary:', error);
      }
    };

    fetchPayrollSummary();
  }, []);

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
              <td>${pd.baseSalary}</td>
              <td >${pd.bonuses}</td>
              <td>${pd.totalPay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollSummary;