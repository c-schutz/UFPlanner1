import {React, useState} from "react";
import { useVData } from "../Vcontext";

const Signup = ({handleStatus}) => {
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
        
        const handleSubmit = async (e) => {
          e.preventDefault(); // Prevent page refresh
  
          try {
              const response = await fetch("http://localhost:3001/signup", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
              });
  
              const data = await response.json();

              if (!response.ok) {
                  setError(data.message);
                  return;
              }
  
              console.log("Signup successful:", data);
              sessionStorage.setItem('userID', JSON.stringify(data.userID));
              handleStatus("login"); // Redirect to another page
  
          } catch (err) {
              console.error("Error logging in:", err);
              setError("An error occurred. Please try again.");
          }
        };


    return (
      <>
      <div>Signup Feature</div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
      <div><button onClick={() => handleStatus('login')}>Login</button></div>
      {error && <p style={{ color: "red" }}>{error}</p>}

    </>
        
    );
};

export default Signup;