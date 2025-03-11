// client/src/App.js

import { React, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import About from "./about/About";
import Budget from "./budget/Budget";
import Account from "./account/Account";
import Navbar from './components/Navbar';
import Questionnaire from "./budget/Questionnaire";
import Banking from "./budget/Banking";
import Allocation from "./budget/Allocation";

function App() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3001/")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  //     console.log(data);
  // }, []);

  return (
    <>
      <Routes>
        <Route path='*' element={<About/>}>
        </Route>
        <Route path='About' element={<About/>}>
        </Route>
        <Route path='Budget' element={<Budget/>}>
        </Route>
        <Route path='Account' element={<Account/>}>
        </Route>
        <Route path='Budget/Questionnaire' element={<Questionnaire/>}>
        </Route>
        <Route path='Budget/Banking' element={<Banking/>}>
        </Route>
        <Route path='Budget/Allocation' element={<Allocation/>}>
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
