import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser , setNewUser ] = useState({ personnelId: '', role: '', password: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState(''); // State for error message

  useEffect(() => {
    // Fetch existing users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser ({ ...newUser , [name]: value });
    setError(''); // Clear error message on input change
  };

  const checkExistingUser  = async (personnelId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users?personnelId=${personnelId}`);
      return response.data.length > 0; // Return true if user exists
    } catch (error) {
      console.error('Error checking existing user:', error);
      return false; // Assume user does not exist on error
    }
  };

  const addUser  = async () => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = newUser ;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      const exists = await checkExistingUser (newUser.personnelId);
      if (exists) {
        setError('Personnel ID already exists. Please use a different ID.'); // Set error message
        return; // Exit function if ID exists
      }

      try {
        console.log('Adding user:', newUser ); // Log the user data being added
        // Make a POST request to add the new user to the User collection
        const response = await axios.post('http://localhost:5000/api/users', newUser );
        console.log('User  added:', response.data); // Log the response from the server
        setUsers([...users, response.data]);

        // Now save the personnelId in the EmployeeRecords collection
        const employeeRecordData = {
          personnelId: newUser.personnelId,
          name: '', // You can add additional fields here if needed
          role: newUser.role,
          baseSalary: 0, // Default or initial values
          bonuses: 0,
          deductions: 0,
          totalHours: 0,
        };

        await axios.post('http://localhost:5000/api/employees', employeeRecordData); // Make sure this endpoint exists

      } catch (error) {
        console.error('Error adding user:', error.response ? error.response.data : error.message);
      }
    }
    setNewUser ({ personnelId: '', role: '', password: '' });
  };

  const editUser  = (index) => {
    setNewUser (users[index]);
    setEditIndex(index);
  };

  const removeUser  = async (index) => {
    const userId = users[index]._id; // Assuming the user object has an _id field
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`); // Make sure to implement a DELETE route in your backend
      const newUsers = users.filter((_, i) => i !== index);
      setUsers(newUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-management">
      <h3>User Management</h3>
      <div>
        <input
          type="text"
          name="personnelId"
          placeholder="Personnel ID"
          value={newUser.personnelId}
          onChange={handleChange}
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
          < option value="Manager">Manager</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
        />
        <button onClick={addUser }>{editIndex !== null ? 'Update User' : 'Add User'}</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </div>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={user._id} className="user-item">
            <span>{user.personnelId} - {user.role}</span>
            <button onClick={() => editUser (index)}>Edit</button>
            <button onClick={() => removeUser (index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;