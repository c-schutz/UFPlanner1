import { React, useState, useEffect } from "react";
import { useVData } from "../Vcontext";
import './Account.css';

const Summary = ({ handleStatus }) => {
    const { logged, setLogged } = useVData();
    const [email, setEmail] = useState("");
    const [dateCreated, setDateCreated] = useState("");

    useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedDate = sessionStorage.getItem("date_created");

    if (storedEmail && storedDate) {
      setEmail(storedEmail.slice(1,-1));
      setDateCreated(storedDate.slice(1, 10));
    }
  }, []);
    const signout = () => {
        handleStatus('login');
        setLogged(false);
    }

    return (
        <>
      <div className="account-title">Account Summary</div>
      <div><strong>Email:</strong> {email}</div>
      <div><strong>Date Created:</strong> {dateCreated}</div>
      <div><button onClick={signout}>Signout</button></div>
    </>
    );
};

export default Summary;