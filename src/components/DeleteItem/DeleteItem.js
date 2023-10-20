import React from 'react';

function DeleteItem({ onDelete }) {
  const handleDeleteItem = (itemName) => {
    // Call the deleteItem function
    deleteItem(itemName);
  }

  const deleteItem = (itemName) => {
    const apiUrl = 'https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/deleteitem';

    const requestBody = {
      item_name: itemName,
    };

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          alert('Item deleted successfully');
          // Call the onDelete callback to refresh the item list
          onDelete();
        } else {
          throw new Error('Error deleting item');
        }
      })
      .catch(error => {
        alert('Error deleting item: ' + error.message);
      });
  }

  return (
    <div>
      <h1>Delete Item</h1>
      {/* Your delete item form or button goes here */}
    </div>
  );
}

export default DeleteItem;
