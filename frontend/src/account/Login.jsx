import {React, useState} from "react";

const Login = ({ onStatusChange }) => {
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function checkInputs(){
        console.log("Email: " , email);
        console.log("password: " , password);

    }
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
                return;
            }

            console.log("Login successful:", data);
            onStatusChange("summary"); // Redirect to another page

        } catch (err) {
            console.error("Error logging in:", err);
            setError("An error occurred. Please try again.");
        }
      };
      

    return (
        <>
      <div>Login Feature</div>
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
          <button type="submit">Login</button>
        </div>
      </form>
      <div><button onClick={() => onStatusChange('signup')}>Sign Up</button></div>
      {error && <p style={{ color: "red" }}>{error}</p>}

    </>
    );
};

export default Login;