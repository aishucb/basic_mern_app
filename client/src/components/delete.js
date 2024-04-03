import React, { useState } from 'react';
import axios from 'axios';

const DeleteUserComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = process.env.REACT_APP_YOUR_HOSTNAME;
      const config = {
        headers: {
          'x-access-token': token,
        },
      };

      const response = await axios.delete(
        'https://interview-plus.onrender.com/api/delete-user',
        config
      );

      // Check for successful response
      if (response.status === 200) {
        // Handle success, e.g., show a success message
        console.log('User deleted successfully');
      } else {
        // Handle unexpected response status
        setError('Failed to delete user');
      }
    } catch (error) {
      // Handle API call errors
      setError('An error occurred. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={handleDeleteUser} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete User'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteUserComponent;
