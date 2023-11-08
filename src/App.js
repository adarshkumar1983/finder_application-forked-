import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppBar from './components/navbar/nav';
import ItemList from './components/itemlist/ItemList';
import AddItemForm from './components/item/AddItemForm';
import ItemDetails from './components/Relation/ItemDetail';

function App() {
  return (
      <BrowserRouter>
      <div>
      <AppBar />
      <AddItemForm />
      <div style={{ marginTop: '30px', padding: '1px' }}>
        <Routes>
        <Route path="/" element={<ItemList />} />
            <Route path="/items/:item_name" element={<ItemDetails />} />
            {/* <Route path="AddItemForm" element={<AddItemForm />} /> */}
            {/* <Route path="/items/:itemName" component={ItemDetails} /> */}
            <Route path="/add-item" element={<AddItemForm />} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;



