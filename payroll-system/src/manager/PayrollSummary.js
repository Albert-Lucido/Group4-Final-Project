import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/PayrollSummary.css";

const PayrollSummary = ({ payrollData }) => {
  const navigate = useNavigate();

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
          {payrollData?.map((pd) => (
            <tr key={pd.id}>
              <td>{pd.employeeName}</td>
              <td>{pd.totalHours}</td>
              <td>${pd.baseSalary}</td>
              <td>${pd.bonuses}</td>
              <td>${pd.totalPay}</td>
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
