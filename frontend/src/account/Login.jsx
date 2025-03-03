import {React, useState} from "react";

const Login = () => {
    const[email, setEmail] = useState("");
    const [passwotd, setPassword] = useState("");
    const handeLogin = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <h2>Login</h2>
        </div>
    );
};

export default Login;