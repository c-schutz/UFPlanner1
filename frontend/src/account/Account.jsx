import { useEffect, useState } from 'react';
import Login from "./Login"
import Signup from "./Signup"
import Navbar from '../components/Navbar';
import Summary from './Summary';
import { useVData } from "../Vcontext";

const Account = () => {

  const { state, setState } = useVData();
  //This is the state of the site that tell it to post the login, signup, or account summary.
  const handleStatus = (state) => {
    setState(state);
  }

  useEffect(() => {
    renderView();
  }, [state])
  //uses the UserStatus to render which page should be viewed.
  const renderView = () => {
    switch (state) {
      case 'login':
        return <Login handleStatus={handleStatus} />;
      case 'signup':
        return <Signup handleStatus={handleStatus} />;
      case 'summary':
        return <Summary handleStatus={handleStatus} />;
      default:
        return <h2> Oh no</h2>;
    }

  };
  //Returns the nav bar with the renderview function that shows the right
  return (
    <>
      <Navbar />
      <div>
        <div className = "account-container">
          <h2 className='account-title-page'>Account Page</h2>
        </div>
        {renderView()}
      </div>
    </>
  );
};

export default Account;