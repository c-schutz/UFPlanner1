import {React, useState} from "react";

const Summary = ({onStatusChange}) => {
    return (
        <>
        <div>Account Summary</div>
        <div><button onClick={() => onStatusChange('login')}>Signout</button></div>
        </>
    );
};

export default Summary;