import "./styles.css";
import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "../item/AddItemForm"
import { Link } from 'react-router-dom';


function AppBar({  onAddButtonClick  }) {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Watch for changes in the theme and apply the style
  useEffect(() => {
    const body = document.body;
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
  }, [theme]);




  return (
    <div className={`app-bar ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="app-bar__logo">
        <img src={logo} alt="Logo" className="round-image" />
      </div>
      <div>
      {/* Other navigation items */}
      <button onClick={onAddButtonClick} className="add-button">
        <i className="bi bi-plus-square" style={{ fontSize: '30px' }}></i>
      </button>
      {/* Add Link to the AddItemForm route */}
      <Link to="/add-item" style={{ display: 'none' }}>Add Item</Link>
    </div>

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? (
            <i className="bi bi-brightness-high-fill"></i> // Light mode icon
        ) : (
          <i className="bi bi-moon-stars-fill"></i> // Night mode icon
        )}
      
      </button>
    </div>
  );
}

export default AppBar;
