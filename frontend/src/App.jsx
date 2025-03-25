// client/src/App.js

import { React, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import About from "./about/About";
import Budget from "./budget/Budget";
import Account from "./account/Account";
import Questionnaire from "./budget/Questionnaire";
import Banking from "./budget/Banking";
import Allocation from "./budget/Allocation";
import { VDataProvider } from './Vcontext'; // Import the provider

function App() {
  const [data, setData] = useState(null);
  const [userStatus, setUserStatus] = useState("login");

  // useEffect(() => {
  //   fetch("http://localhost:3001/")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  //     console.log(data);
  // }, []);

  return (
    <>
      <VDataProvider>
        <Routes>
          <Route path='*' element={<About />}>
          </Route>
          <Route path='About' element={<About />}>
          </Route>
          {/* can add more hooks to context as necessary. or other values */}
          <Route path='Budget' element={<Budget />}>
          </Route>
          <Route path='Budget/Questionnaire' element={<Questionnaire />}>
          </Route>
          <Route path='Budget/Banking' element={<Banking />}>
          </Route>
          <Route path='Budget/Allocation' element={<Allocation />}>
          </Route>
          <Route path='Account' element={<Account userStatus = {userStatus} setUserStatus = {setUserStatus}/>}>
          </Route>
        </Routes>
      </VDataProvider>


      {/* <div className="App">
        <header className="App-header">
          <p>{!data ? "Loading..." : data}</p>
        </header>
      </div> */}
    </>
  );
}

export default App;
