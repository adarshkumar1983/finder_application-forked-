import "./styles.css";
import React from 'react';
import logo from './logo.png';


function AppBar() {
  return (
    <div className="app-bar">
      <div className="app-bar__logo">     
      <img src={logo} alt="Logo" className="round-image" />
      </div>
      <div className="app-bar__search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </div>
  );
}

export default AppBar;
