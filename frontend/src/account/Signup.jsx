import {React, useState} from "react";
import { useVData } from "../Vcontext";
import './Account.css';
const Signup = ({handleStatus}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
  
        const handleSubmit = async (e) => {
          e.preventDefault(); // Prevent page refresh
          if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
          }
          setError(''); 
          if (!firstName.trim() || !lastName.trim()) {
            setError("Fill in first and last names");
            return;
          }
          setError('');
          try {
              const response = await fetch("http://localhost:3001/signup", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password, firstName, lastName }),
              });
  
              const data = await response.json();

              if (!response.ok) {
                setError(data.message);
                setTimeout(() => {
                  setError(""); // Clear the error message after 2 seconds
                }, 2000); 
                return;
              }
  
              console.log("Signup successful:", data); 
              setError("signup") 

              sessionStorage.setItem('userID', JSON.stringify(data.userID));
              handleStatus("login"); // Redirect to another page
  
          } catch (err) {
              console.error("Error logging in:", err);
              setError("An error occurred. Please try again.");
          }
        };


    return (
      <>
      <div className="account-title">Signup</div>
      <form className="account-form" onSubmit={handleSubmit}>
      <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      </div>
      <div>
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      </div>
      <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button className="account-action" type="submit">Signup</button>
        </div>
      </form>
      <div className = "account-switch-container">
        <button className = "account-switch" onClick={() => handleStatus('login')}>Already have an account? Login</button>
      </div>
      {error && <p className="error-message">{error}</p>}


    </>
        
    );
};

export default Signup;