// client/src/App.js

import { React, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import About from "./about/About";
import Budget from "./budget/Budget";
import Account from "./account/Account";
import Navbar from './components/Navbar';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='*' element={<About/>}>
        </Route>
        <Route path='About' element={<About/>}>
        </Route>
        <Route path='Budget' element={<Budget/>}>
        </Route>
        <Route path='Account' element={<Account/>}>
        </Route>
      </Routes>

      
      {/* <div className="App">
        <header className="App-header">
          <p>{!data ? "Loading..." : data}</p>
        </header>
      </div> */}
    </>
  );
}

export default App;
