import React, { useState, useEffect, useRef } from 'react';
import './SerchItemStyle.css';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchQuery, onSearch]);

  useEffect(() => {
    // Add a click event listener on the document to close the search component
    const handleDocumentClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <button onClick={toggleSearch} className="blue-button">
    <i className="bi bi-search"></i> {/* Bootstrap search icon */}
  </button>
      {isSearchVisible && (
        <input
          type="text"
          placeholder="Search items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the input from closing
        />
      )}
    </div>
  );
}

export default SearchBar;
