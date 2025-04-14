import { React, useState } from "react";
import { useVData } from "../Vcontext";
import './Account.css';

const Summary = ({ handleStatus }) => {
    const { logged, setLogged } = useVData();

    const signout = () => {
        handleStatus('login');
        setLogged(false);
        sessionStorage.clear();
    }

    return (
        <>
            <div className="account-title">Account Summary</div>
            <div><button onClick={signout}>Signout</button></div>
        </>
    );
};

export default Summary;