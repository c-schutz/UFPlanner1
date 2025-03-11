import {React, useState} from "react";

const Signup = ({onStatusChange}) => {
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function checkInputs(){
        console.log("Email: " , email);
        console.log("password: " , password);

    }
    return (
        <>
        <div>Sign up Feature</div>
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
        <div>
        <button onClick={() => onStatusChange('summary')}>Sign Up</button>
        </div>
        <div><button onClick={() => onStatusChange('login')}>Back to Login</button></div>
        </>
        
    );
};

export default Signup;