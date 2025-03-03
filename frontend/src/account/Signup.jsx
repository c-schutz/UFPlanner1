import {React, useState} from "react";

const Signup = () => {
    const[email, setEmail] = useState("");
    const [passwotd, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handeLogin = (e) => {
        e.preventDefault(); 
        console.log("Signup email:", email, "password", password);
    };
    return (
        <div>
            <h2>Signup</h2>
        </div>
    );
};

export default Signup;