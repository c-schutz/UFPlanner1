import {React, useState} from "react";

const Login = ({ onStatusChange }) => {
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function checkInputs(){
        console.log("Email: " , email);
        console.log("password: " , password);

    }
      

    return (
        <> 
        <div>Login Feature</div> 
        <div> 
        <input
          value={email}
          onChange={e => {
            setEmail(e.target.value) 
            checkInputs()
            }
          }
        />
        </div>
        <div>
        <input
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            checkInputs()
            }
        }

        />
        </div>
        <div><button onClick={() => onStatusChange('summary')}>Login</button></div>
        <div><button onClick={() => onStatusChange('signup')}>Sign Up</button></div>
        </>
    );
};

export default Login;