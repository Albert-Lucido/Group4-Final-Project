import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReportingAnalytics() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch reports when the component mounts
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports'); // Assuming this endpoint returns the reports
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setMessage('Error fetching reports.');
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h3>Reporting & Analytics</h3>
      {message && <p>{message}</p>}
      <h4>Generated Reports</h4>
      <table>
        <thead>
          <tr>
            <th>Report Type</th>
            <th>Total Amount</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.type}</td>
              <td>${report.totalAmount.toFixed(2)}</td>
              <td>{report.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportingAnalytics;