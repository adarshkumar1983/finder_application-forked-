import React, { useEffect, useState } from 'react';
import "./itemliststyles.css";
import "./DeleteItemStyle.css";
import 'bootstrap-icons/font/bootstrap-icons.css';



// Define a functional component for your application
function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  //const audio = new Audio(trashSound); // Load the trash sound

  // Implement the useEffect hook to load items when the component mounts
  useEffect(() => {
    loadItems();
  }, []);

 

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

  function deleteItem(itemName) {
    // Send the DELETE request directly from here
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
          // audio.play(); // Play the trash sound
          setDeletedItem(itemName); // Set the deleted item
          setTimeout(() => {
            setDeletedItem(null); // Clear the deleted item after a delay
            loadItems(); // Refresh the item list after successful deletion
          }, 1000); // Set a 2-second delay for the animation
        } else {
          throw new Error('Error deleting item');
        }
      })
      .catch(error => {
        alert('Error deleting item: ' + error.message);
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
          // <Item name="item.item_name" description={item.description} type={item.item_type}></>
          <tr key={item.item_name}>
            <td>{item.item_name}</td>
            <td>{item.description}</td>
            <td className="tooltip" style={{ display: ' inline-block', alignItems: 'center', lineHeight: '30px'  }}>
  {item.item_type === 'object' ? (
    <i className="bi bi-box" style={{   marginRight: '5px',  border: 'none', borderRadius: '0'}}></i>
  ) : item.item_type === 'container' ? (
    <i className="bi bi-bag-fill" style={{ marginRight: '5px', border: 'none', borderRadius: '0'  }}></i>
  ) : null}
  {/* {item.item_type} */}
  <span className="tooltiptext">
    {item.item_type === 'object' ? 'Object' : item.item_type === 'container' ? 'Container' : 'Unknown'}
  </span>
</td>

              <td>
              <button>Edit</button>
        </td>
        <td>
        <button
                  onClick={() => deleteItem(item.item_name)}
                  onMouseEnter={() => setHoveredItem(item.item_name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={
                    deletedItem === item.item_name
                      ? 'shake'
                      : hoveredItem === item.item_name
                      ? 'blink'
                      : ''
                  }
                >
                  <i className="bi bi-trash"></i>
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {deletedItem && (
        <div className="delete-animation">
          Item "{deletedItem}" deleted successfully!
        </div>
      )}
  </div>
  );
}

export default App;
