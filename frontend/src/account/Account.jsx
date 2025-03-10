import { useState } from 'react';
import Login from "./Login"
import Signup from "./Signup"
import Navbar from '../components/Navbar';
import Summary from './Summary';

const Account = () => { 
    const [UserStatus, setUserStatus] = useState("login");
    const handleStatus = (status) => {
        setUserStatus(status);
    }
    const renderView = () => {
        console.log(`Rendering view: ${UserStatus}`); // Debugging line
        switch (UserStatus) {
          case 'login':
            return <Login onStatusChange = {handleStatus} />;
          case 'signup':
            return <Signup onStatusChange = {handleStatus}/>;
          case 'summary':
            return <Summary onStatusChange = {handleStatus}/>;
        }
      };
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