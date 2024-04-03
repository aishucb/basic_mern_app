import React, { useState, useEffect } from 'react';

const ItemsComponent = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://interview-plus.onrender.com/api/items');

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError('An error occurred. Please try again later.');
      }

      setIsLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>Items List</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemsComponent;
