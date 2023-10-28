// // import "./styles.css";
// import React, { useEffect, useState } from 'react';
// import AppBar from './components/navbar/nav';
// import ItemList from './components/itemlist/ItemList';
// import AddItemForm from './components/item/AddItemForm';
// // import ItemDetails from './components/Relation/ItemDetail';






// function App() {


//   return (
//     <div >
//     <AppBar/>
//     <AddItemForm />
//     <ItemList/>
//     {/* <ItemDetails /> */}
 
//     </div>
//   );
// }

// export default App;



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
      <div style={{ marginTop: '60px', padding: '0px' }}>
        <Routes>
        <Route path="/" element={<ItemList />} />
            <Route path="/items/:item_name" element={<ItemDetails />} />
            {/* <Route path="AddItemForm" element={<AddItemForm />} /> */}
            {/* <Route path="/items/:itemName" component={ItemDetails} /> */}
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;



