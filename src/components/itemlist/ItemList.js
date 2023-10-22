import React, { useEffect, useState } from 'react';

import "./itemliststyles.css";
import SearchBar from "../search/SerchItem.js";
import "./DeleteItemStyle.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import EditModal from '../EditItem/EditItem.js'; 
import '../EditItem/EdititemStyle.css'; 





// Define a functional component for your application
function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for edit modal visibility
  const [selectedItem, setSelectedItem] = useState(null);


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

  const openEditModal = (itemData) => {
    setSelectedItemData(itemData);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

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
  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  return (

      <div className="App">
        <SearchBar onSearch={handleSearch} className="search-button" />
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
            {items
              .filter((item) =>
                item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <tr key={item.item_name}>
                <td>
      {item.item_name}
                  
                </td>
                  <td>{item.description}</td>
                  <td className="tooltip" style={{ display: 'inline-block', alignItems: 'center', lineHeight: '30px' }}>
                    {item.item_type === 'object' ? (
                      <i className="bi bi-box" style={{ marginRight: '5px', border: 'none', borderRadius: '0' }}></i>
                    ) : item.item_type === 'container' ? (
                      <i className="bi bi-bag-fill" style={{ marginRight: '5px', border: 'none', borderRadius: '0' }}></i>
                    ) : null}
                    <span className="tooltiptext">
                      {item.item_type === 'object' ? 'Object' : item.item_type === 'container' ? 'Container' : 'Unknown'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => openEditModal(item)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
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
        {isEditModalVisible && (
          <div className="modal active" id="editModal">
            <div className="modal-content">
              <EditModal selectedItemData={selectedItemData} hideEditModal={closeEditModal} loadItems={loadItems} />
            </div>
          </div>
        )}
       
      </div>


  );
}

export default App;
