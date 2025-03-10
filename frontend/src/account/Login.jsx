import {React, useState} from "react";

const Login = ({ onStatusChange }) => {
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handeLogin = (e) => {
        e.preventDefault();
    }


    return (
        <>
        <div>Login Feature</div>
        <div><button onClick={() => onStatusChange('summary')}>Login</button></div>
        <div><button onClick={() => onStatusChange('signup')}>Sign Up</button></div>
        </>
    );
};

export default Login;