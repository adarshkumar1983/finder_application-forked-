import React, { useState, useRef, useEffect } from 'react';
import './additemstyle.css';
import NavigationBar from '../navbar/nav';

const AddItemForm = () => {
  const [item, setItem] = useState({ item_name: '', description: '', item_type: '' });
  const [Items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isPostFieldsVisible, setPostFieldsVisible] = useState(false);

  const postFieldsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (postFieldsRef.current && !postFieldsRef.current.contains(event.target)) {
        setPostFieldsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const callAPI = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };

      const response = await fetch('https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user', requestOptions);

      if (response.status === 200) {
        const data = await response.json();
        setItems(data);
        setError(null);
        clearInputFields();
      } else {
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setError('An error occurred while posting the item.');
      console.error('Error:', error);
    }
  };

  const clearInputFields = () => {
    setItem({ item_name: '', description: '', item_type: '' });
  };

  const togglePostFieldsVisibility = () => {
    setPostFieldsVisible(!isPostFieldsVisible);
  };

  return (
    <div>
      <NavigationBar onAddButtonClick={togglePostFieldsVisibility} />
      <NavigationBar onAddButtonClick={togglePostFieldsVisibility} />
    <div className="container">
      <h1 className="header">ADD ME</h1>
    
      <br></br>
      {/* {!isPostFieldsVisible && (
         <div>
           <button onClick={togglePostFieldsVisibility} className="add-button">
          <i class="bi bi-plus-square"  style={{ fontSize: '40px' }}></i>
        //   </button>
         </div>
      )} */}


      {isPostFieldsVisible && (
        <div ref={postFieldsRef}>
          <input
            type="text"
            name="item_name"
            placeholder="Item Name"
            value={item.item_name}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={handleInputChange}
            className="input"
          />
          <select
            name="item_type"
            value={item.item_type}
            onChange={handleInputChange}
            className="input"
          >
            <option value="">Select Item Type</option>
            <option value="container">Container</option>
            <option value="object">Object</option>
          </select>
          <button onClick={callAPI} className="button">
            <i className="bi bi-send-fill"></i>
          </button>
         
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
    </div>
  );
};

export default AddItemForm;
