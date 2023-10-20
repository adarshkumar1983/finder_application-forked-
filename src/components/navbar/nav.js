import "./styles.css";
import React, { useState, useEffect } from "react";
import logo from "./logo.png";

function AppBar() {
  const [theme, setTheme] = useState('light');

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
      <div className="app-bar__search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <button onClick={toggleTheme} className="theme-toggle">
        Toggle Theme
      </button>
    </div>
  );
}

export default AppBar;
