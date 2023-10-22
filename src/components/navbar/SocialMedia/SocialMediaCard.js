// SocialMediaList.js
import React from 'react';
import SocialMediaCard from './SocialMediaCard';

const socialMediaData = [
  {
    id: 1,
    username: 'User1',
    platform: 'Twitter',
    description: 'Twitter description for User1.',
    url: 'https://twitter.com/user1',
  },
  {
    id: 2,
    username: 'User2',
    platform: 'Facebook',
    description: 'Facebook description for User2.',
    url: 'https://facebook.com/user2',
  },
  {
    id: 3,
    username: 'User3',
    platform: 'Instagram',
    description: 'Instagram description for User3.',
    url: 'https://instagram.com/user3',
  },
  {
    id: 4,
    username: 'User4',
    platform: 'Twitter',
    description: 'Twitter description for User4.',
    url: 'https://twitter.com/user4',
  },
  // Add more social media accounts as needed
];

const SocialMediaList = () => {
  return (
    <div className="social-media-list">
      {socialMediaData.map((account) => (
        <SocialMediaCard key={account.id} {...account} />
      ))}
    </div>
  );
};

export default SocialMediaList;
