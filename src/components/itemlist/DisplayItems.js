import React, { useEffect, useState } from 'react';
import "./itemliststyles.css";

// Define a functional component for your application
function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // Implement the useEffect hook to load items when the component mounts
  useEffect(() => {
    loadItems();
  }, []);

  // Function to handle item update
  // function updateItem(event) {
  //   event.preventDefault(); // Prevent the default form submission

  //   // Get updated values from the form fields
  //   const updatedItemName = event.target.elements.item_name.value;
  //   const updatedDescription = event.target.elements.description.value;
  //   const updatedItemType = event.target.elements.item_type.value;

    // // Prepare the request body
    // const requestBody = {
    //   item_name: updatedItemName,
    //   description: updatedDescription,
    //   item_type: updatedItemType,
    // };

  //   // Send the PUT request to update the item
  //   fetch('https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(requestBody),
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         alert('Item updated successfully');
  //         // Reload the items
  //         loadItems();
  //       } else {
  //         throw new Error('Error updating item');
  //       }
  //     })
  //     .catch(error => {
  //       alert('Error updating item: ' + error.message);
  //     });
  // }

  // Function to load items from DynamoDB
  function loadItems() {
    fetch('https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user')
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          setItems(JSON.parse(data.body));
        } else {
          throw new Error('Error loading items');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }

  // Your displayItems and other functions would be similar, just make sure to adapt them to React.

  return (
    <div className="App">
    <h1>Items</h1>
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Description</th>
          <th>Item Type</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.item_name}>
            <td>{item.item_name}</td>
            <td>{item.description}</td>
            <td>{item.item_type}</td>
            <td>
              <button>Edit</button>
        </td>
        <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default App;
