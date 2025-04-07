import { React, useState } from "react";
import { useVData } from "../Vcontext";


const Summary = ({ handleStatus }) => {
    const { logged, setLogged } = useVData();

    const signout = () => {
        handleStatus('login');
        setLogged(false);
    }

    return (
        <>
            <div>Account Summary</div>
            <div><button onClick={signout}>Signout</button></div>
        </>
    );
};

export default Summary;