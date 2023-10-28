import React, { useState, useEffect } from "react";

import { useNavigate, Link, Routes, Route } from 'react-router-dom';



import "./itemliststyles.css";
import SearchBar from "../search/SerchItem.js";
import "./DeleteItemStyle.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditModal from "../EditItem/EditItem.js";
import "../EditItem/EdititemStyle.css";
import "../Relation/ItemDetail"; 
// import ItemDetail from '../Relation/ItemDetail.js';





// Define a functional component for your application
function ItemList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for edit modal visibility
  const navigate = useNavigate();


  



  // Implement the useEffect hook to load items when the component mounts
  useEffect(() => {

    loadItems();
  }, []);

  // Function to load items from DynamoDB
  function loadItems() {
    fetch("https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user")
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setItems(JSON.parse(data.body));
        } else {
          throw new Error("Error loading items");
        }
      })
      .catch((error) => {
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


  // delete duntion 
  function deleteItem(itemName) {
    // Send the DELETE request directly from here
    const apiUrl =
      "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/deleteitem";
    const requestBody = {
      item_name: itemName,
    };

    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          setDeletedItem(itemName); // Set the deleted item
          setTimeout(() => {
            setDeletedItem(null); // Clear the deleted item after a delay
            loadItems(); // Refresh the item list after successful deletion
          }, 1000); // Set a 2-second delay for the animation
        } else {
          throw new Error("Error deleting item");
        }
      })
      .catch((error) => {
        alert("Error deleting item: " + error.message);
      });
  }
  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  // const handleItemClick = (itemName) => {
  //   // Find the selected item by its name
  //   const selectedItem = items.find(item => item.item_name === itemName);
    
  //   // Store the selected item's data in localStorage or in a state management tool like Redux
  //   // For this example, we'll store in localStorage
  //   localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    
  //   // Redirect to the details page for the clicked item
  //   navigate(`/items/${itemName}`);
  // };


  return (


    <div className="App">
      <SearchBar onSearch={handleSearch} className="search-button" />
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Item Type</th>
            <th> </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) =>
              item.item_name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((item) => (
              <tr key={item.item_name}>
                <td>
                <Link to={{ pathname: `/items/${item.item_name}`, state: { item } }}>
              {item.item_name}
            </Link>
                </td>
                <td>{item.description}</td>
                <td
                  className="tooltip"
                  style={{
                    display: "inline-block",
                    alignItems: "center",
                    lineHeight: "30px",
                  }}
                >
                  {item.item_type === "object" ? (
                    <i
                      className="bi bi-box"
                      style={{
                        marginRight: "5px",
                        border: "none",
                        borderRadius: "0",
                      }}
                    ></i>
                  ) : item.item_type === "container" ? (
                    <i
                      className="bi bi-bag-fill"
                      style={{
                        marginRight: "5px",
                        border: "none",
                        borderRadius: "0",
                      }}
                    ></i>
                  ) : null}
                  <span className="tooltiptext">
                    {item.item_type === "object"
                      ? "Object"
                      : item.item_type === "container"
                      ? "Container"
                      : "Unknown"}
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
                        ? "shake"
                        : hoveredItem === item.item_name
                        ? "blink"
                        : ""
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
            <EditModal
              selectedItemData={selectedItemData}
              hideEditModal={closeEditModal}
              loadItems={loadItems}
            />
          </div>
        </div>
      )}
   
 
    </div>

  
     
  );
}

export default ItemList;
