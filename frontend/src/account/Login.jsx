import { React, useState } from "react";
import { useVData } from "../Vcontext";
import './Account.css';
const Login = ({ handleStatus }) => {
  const { logged, setLogged } = useVData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setTimeout(() => {
          setError(""); // Clear the error message after 2 seconds
        }, 2000); 
        return;
      }

      console.log("Login successful:", data);
      sessionStorage.setItem('userID', JSON.stringify(data.userID));
      sessionStorage.setItem('email', JSON.stringify(data.email));
      sessionStorage.setItem('date_created', JSON.stringify(data.date_created)); 
      sessionStorage.setItem('name',JSON.stringify(data.name))
      //logged in logic here
      setLogged(true);
      handleStatus("summary"); // Redirect to another page

    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again.");
    }
  };


  return (
    <>
      <div className="account-title">Login </div>
      <form className="account-form" onSubmit={handleSubmit}>
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
          <button className="account-action" type="submit">Login</button>
        </div>
      </form>
      <div className = "account-switch-container">
        <div>
          <button className="account-switch" onClick={() => handleStatus('signup')}>Don't have an account? Sign Up</button></div>
      </div>
      {error && <p className="error-message">{error}</p>}

    </>
  );
};

export default Login;