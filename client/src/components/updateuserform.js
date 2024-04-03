import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'https://interview-plus.onrender.com/api/update-user';
    const token = process.env.REACT_APP_YOUR_HOSTNAME
    try {
      const response = await axios.put(
        url,
        {
          name,
          password,
        },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );

      if (response.status === 200) {
        setMessage('User updated successfully!');
      } else {
        setMessage('Failed to update user.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{textAlign:"center"}}>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <button type="submit"
                        style={{ padding: "10px", border: "none", borderRadius: "5px", fontFamily: "Poppins, sans-serif", fontSize: "16px", color: "#fff", backgroundColor: "teal", marginRight: "10px", marginBottom: "10px", cursor: "pointer" }}
                        >Update</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UpdateUserForm;
