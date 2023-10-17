// import "./styles.css";
import React, { useEffect, useState } from 'react';
import AppBar from './components/navbar/nav';
import Gallery from './components/itemlist/DisplayItems';
import Additem from './components/item/additem';


function App() {


  return (
    <div>
    <AppBar/>
    <Additem/>
  <Gallery/>
    </div>
  );
}

export default App;





