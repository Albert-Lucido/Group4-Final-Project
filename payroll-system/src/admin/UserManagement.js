import React, { useState } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser , setNewUser ] = useState({ name: '', role: '', permissions: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser ({ ...newUser , [name]: value });
  };

  const addUser  = () => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = newUser ;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, newUser ]);
    }
    setNewUser ({ name: '', role: '', permissions: '' });
  };

  const editUser  = (index) => {
    setNewUser (users[index]);
    setEditIndex(index);
  };

  const removeUser  = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  return (
    <div className="user-management">
      <h3>User Management</h3>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newUser.role}
          onChange={handleChange}
        />
        <input
          type="text"
          name="permissions"
          placeholder="Permissions"
          value={newUser.permissions}
          onChange={handleChange}
        />
        <button onClick={addUser }>{editIndex !== null ? 'Update User' : 'Add User'}</button>
      </div>
      <div>
        <h4>Current Users</h4>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.role} - {user.permissions}
              <button onClick={() => editUser (index)}>Edit</button>
              <button onClick={() => removeUser (index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserManagement;