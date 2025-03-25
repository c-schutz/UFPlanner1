import {React, useState} from "react";

const Summary = ({handleStatus}) => {
    return (
        <>
        <div>Account Summary</div>
        <div><button onClick={() => handleStatus('login')}>Signout</button></div>
        </>
    );
};

export default Summary;