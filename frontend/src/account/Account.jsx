import { useState } from 'react';
import Login from "./Login"
import Signup from "./Signup"
import Navbar from '../components/Navbar';
import Summary from './Summary';

const Account = ({userStatus, setUserStatus}) => { 
  //This is the state of the site that tell it to post the login, signup, or account summary.
    const handleStatus = (status) => {
        setUserStatus(status);
    }  
    //uses the UserStatus to render which page should be viewed.
    const renderView = () => {
      console.log(userStatus)
        switch (userStatus) {
          case 'login':
            return <Login handleStatus = {handleStatus} />;
          case 'signup':
            return <Signup handleStatus = {handleStatus}/>;
          case 'summary':
            return <Summary handleStatus = {handleStatus}/>;
          default :
            return <h2> Oh no</h2>;
        }

      }; 
      //Returns the nav bar with the renderview function that shows the right
  return (
    <>
      <Navbar />
      <div>
        <h2>Account Page</h2>
        {renderView()}
      </div>
    </>
  );
};

export default Account;