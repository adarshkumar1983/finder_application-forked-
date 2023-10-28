import React from 'react';
import { useParams } from 'react-router-dom';

function ItemDetail({ items }) {
  const { itemName } = useParams();

  const selectedItem = items.find(item => item.item_name === itemName);

  return (
    <div>
      {selectedItem && (
        <div>
          <h2>{selectedItem.item_name}</h2>
          <p>{selectedItem.description}</p>
          {/* Display other details of the selected item */}
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
