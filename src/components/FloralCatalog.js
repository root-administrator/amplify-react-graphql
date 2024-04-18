// src/components/FloralCatalog.js

import React, { useState, useEffect } from 'react';
import './FloralCatalog.css'; // CSS for styling

function FloralCatalog() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    // Simulate fetching data
    const fetchMoreData = () => {
        setLoading(true);
        // Placeholder for fetch request or Amplify API call
        setTimeout(() => {
            setItems(prevItems => [...prevItems, ...Array.from({ length: 20 }).map((_, index) => `Arrangement ${prevItems.length + index + 1}`)]);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchMoreData();
    }, []); // Only on mount

    // Infinite scrolling logic
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
            setPage(prevPage => prevPage + 1); // Increment page count to fetch more data
        };

        window.addEventListener('scroll', handleScroll);
        fetchMoreData(); // Fetch more items on scroll

        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div className="catalog">
            {items.map((item, index) => (
                <div key={index} className="catalog-item">{item}</div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default FloralCatalog;
