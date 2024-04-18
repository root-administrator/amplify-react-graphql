import React, { useState, useEffect } from "react";
import "./FloralCatalog.css"; // CSS for styling

interface Item {
  id: number;
  name: string;
  imageUrl: string; // Add an imageUrl property
}

const FloralCatalog: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Simulate fetching data
  const fetchMoreData = () => {
    setLoading(true);
    // Placeholder for fetch request or Amplify API call
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 20 }).map((_, index) => ({
          id: prevItems.length + index,
          name: `Arrangement ${prevItems.length + index + 1}`,
          imageUrl: `https://s3.amazonaws.com/stg.obfuscationhub.com/image${
            prevItems.length + index + 1
          }.jpg`, // Assuming a naming convention
        })),
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMoreData();
  }, []); // Only on mount

  return (
    <div className="catalog">
      {items.map((item) => (
        <div key={item.id} className="catalog-item">
          <h3>{item.name}</h3>
          <img src={item.imageUrl} alt={item.name} />
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default FloralCatalog;
