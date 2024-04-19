import React, { useState, useEffect } from "react";
import "./FloralCatalog.css";

interface Item {
  id: number;
  name: string;
  imageUrl: string;
}

const FloralCatalog: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Base URL for CloudFront
  const cloudFrontBaseUrl = "https://de0qkelr3j1kf.cloudfront.net";

  // Simulate fetching data
  const fetchMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 20 }).map((_, index) => ({
          id: prevItems.length + index,
          name: `Arrangement ${prevItems.length + index + 1}`,
          imageUrl: `${cloudFrontBaseUrl}/images/image${
            prevItems.length + index + 1
          }.jpg?width=300&height=300`,
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
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default FloralCatalog;
