

import React, { useState, useEffect } from 'react';
import './ItemDetail.css';
import { useLocation } from 'react-router-dom';
import '../itemlist/ItemList';

import { useParams } from 'react-router-dom';
function ItemDropdown({ itemName }) {





  const [objectItems, setObjectItems] = useState([]);
  const [containerItems, setContainerItems] = useState([]);
  const [selectedObjectItem, setSelectedObjectItem] = useState('');
  const [selectedContainerItem, setSelectedContainerItem] = useState('');
 const [showDropdown, setShowDropdown] = useState(false);
 const location = useLocation();
//  const selectedItem = location.state ? location.state.item : null;
const [relations, setRelations] = useState([]);
const [error, setError] = useState(null);
const { item_name } = useParams();
const [itemDetails, setItemDetails] = useState({});



  useEffect(() => {

    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/relationitems/${item_name}`);
        if (response.ok) {
          const data = await response.json();
          // Assuming the API response returns an object with item details
          setItemDetails(data);
        } else {
          // Handle the case where the response is not okay
          console.error('Failed to fetch item details');
        }
      } catch (error) {
        // Handle any network or processing errors
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();

    // Fetch object items
    const objectApiUrl = 'https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?item_type=object';
    fetchItems(objectApiUrl, 'object');

    // Fetch container items
    const containerApiUrl = 'https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?item_type=container';
    fetchItems(containerApiUrl, 'container');

  }, [item_name]);


  const fetchItems = (apiUrl, itemType) => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        const itemNames = parsedData.map((item) => item.item_name);
        if (itemType === 'object') {
          setObjectItems(itemNames);
        } else if (itemType === 'container') {
          setContainerItems(itemNames);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleObjectSelectChange = (event) => {
    setSelectedObjectItem(event.target.value);
  };

  const handleContainerSelectChange = (event) => {
    setSelectedContainerItem(event.target.value);
  };

  const handleRelationItems = async () => {
    try {
      const response = await fetch('https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/relationitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          item_name: selectedObjectItem,
          container_name: selectedContainerItem
        })
      });

      if (response.ok) {
        // Handle success - maybe show a success message or reset the selections
        console.log('Items posted successfully!');
        setSelectedObjectItem('');
        setSelectedContainerItem('');
      } else {
        // Handle errors - maybe show an error message
        console.error('Failed to post items');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const toggleDropdown = () => {
         setShowDropdown(!showDropdown);
      };
    
  return (
    <div>
      <div>
      <h1>Relations for {item_name}</h1>
      <div>
      
        <p>Item Name: {itemDetails.item_name}</p>
        <p>Item Description: {itemDetails.container_name}</p>
    
      </div>
    </div>
   <div>
      <h1>Details for {item_name}</h1>
      {itemDetails ? (
        <div>
          <h2>{itemDetails.item_name}</h2>
          <p>Description: {itemDetails.description}</p>
          <p>Description: {itemDetails.item_type}</p>
         
        </div>
      ) : (
        <p>Loading item details...</p>
      )}
    </div>
 
    <div>
  
    <div className="item-dropdown-container">
    
       {showDropdown && (
     <div className="dropdown-content">
                <h1>Item Dropdown</h1>
               <div className="items-wrapper">
                <div className="object-items">
        <h2>Objects</h2>
        <select value={selectedObjectItem} onChange={handleObjectSelectChange} className="full-width-select">
          <option value="">Select.... </option>
          {objectItems.map((itemName, index) => (
            <option key={index} value={itemName}>
              {itemName}
            </option>
          ))}
          </select>
         {selectedObjectItem && <p>Selected: {selectedObjectItem}</p>}
            </div>
      <div className="container-items">
        <h2>Containers</h2>
        <select value={selectedContainerItem} onChange={handleContainerSelectChange} className="full-width-select">
          <option value="">Select.....</option>
          {containerItems.map((itemName, index) => (
            <option key={index} value={itemName}>
              {itemName}
            </option>
          ))}
        </select>
        {selectedContainerItem && <p>Selected: {selectedContainerItem}</p>}
      </div>
  


    
    </div>
    <button onClick={handleRelationItems} className="post-button">Relation</button>
    </div>
       
      
    )}
       </div>
       <button className="toggle-button" onClick={toggleDropdown}>
        Dropdown
       </button>
       </div>

       </div>
              
       
  );

}

export default ItemDropdown;


