import '../itemlist/ItemList.js';
import React from 'react';

const ItemDetails = ({ item }) => {
  return (
    <div>
      <h2>{item.item_name}</h2>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Item Type:</strong> {item.item_type}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ItemDetails;
