// SocialMediaCard.js
import React, { useState } from 'react';
import './SocialMediaCard.css';

const SocialMediaCard = ({ username, platform, description, url }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(url, '_blank'); // Open the URL in a new tab
  };

  return (
    <div
      className={`social-media-card ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content">
        <h3>{username}</h3>
        <p>{platform}</p>
      </div>
      {isHovered && <p className="description">{description}</p>}
    </div>
  );
};

export default SocialMediaCard;
