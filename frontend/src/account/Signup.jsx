import {React, useState} from "react";

const Signup = ({onStatusChange}) => {
    const[email, setEmail] = useState("");
    const [passwotd, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handeLogin = (e) => {
        e.preventDefault(); 
        console.log("Signup email:", email, "password", password);
    };
    return (
        <>
        <div>Sign up Feature</div>
        <div>
        <button onClick={() => onStatusChange('summary')}>Sign Up</button>
        </div>
        <button onClick={() => onStatusChange('login')}>Back to Login</button>
        </>
        
    );
};

export default Signup;