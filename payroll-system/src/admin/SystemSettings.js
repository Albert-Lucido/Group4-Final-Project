import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SystemSettings() {
  const [paySchedule, setPaySchedule] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [deductions, setDeductions] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch current settings when the component mounts
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/system-settings'); // Assuming this endpoint returns current settings
        const { paySchedule, taxRate, deductions } = response.data;
        setPaySchedule(paySchedule);
        setTaxRate(taxRate);
        setDeductions(deductions);
      } catch (error) {
        console.error('Error fetching system settings:', error);
        setMessage('Error fetching system settings.');
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const settings = {
        paySchedule,
        taxRate,
        deductions,
      };

      // Send the updated settings to the server
      await axios.post('http://localhost:5000/api/system-settings', settings);
      setMessage('System settings updated successfully!');
    } catch (error) {
      console.error('Error updating system settings:', error);
      setMessage('Error updating system settings.');
    }
  };

  return (
    <div>
      <h3>System Settings</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pay Schedule:</label>
          <input
            type="text"
            value={paySchedule}
            onChange={(e) => setPaySchedule(e.target.value)}
            placeholder="e.g., Biweekly"
            required
          />
        </div>
        <div>
          <label>Tax Rate (%):</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="e.g., 20"
            required
          />
        </div>
        <div>
          <label>Deductions:</label>
          <input
            type="text"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            placeholder="e.g., Health Insurance, Retirement Fund"
            required
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SystemSettings;