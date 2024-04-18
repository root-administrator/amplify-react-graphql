// src/components/FloralCatalog.tsx
import React, { useState, useEffect } from "react";
import "./FloralCatalog.css"; // CSS for styling

interface Item {
  id: number;
  name: string;
}

const FloralCatalog: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [setPage] = useState<number>(0);

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
        })),
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMoreData();
  }, []); // Only on mount

  // Infinite scrolling logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      )
        return;
      setPage((prevPage) => prevPage + 1); // Increment page count to fetch more data
    };

    window.addEventListener("scroll", handleScroll);
    fetchMoreData(); // Fetch more items on scroll

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="catalog">
      {items.map((item) => (
        <div key={item.id} className="catalog-item">
          {item.name}
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default FloralCatalog;
