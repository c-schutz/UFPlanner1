import { React, useState, useEffect } from "react";
import { useVData } from "../Vcontext";
import './Account.css';

const Summary = ({ handleStatus }) => {
    const { logged, setLogged } = useVData();
    const [email, setEmail] = useState("");
    const [dateCreated, setDateCreated] = useState(""); 
    const [fName, setName] = useState("");

    useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedDate = sessionStorage.getItem("date_created");
    const name = sessionStorage.getItem('name'); 
    console.log(name)
    if (storedEmail && storedDate && name) {
      setEmail(storedEmail.slice(1,-1));
      setDateCreated(storedDate.slice(1, 11));
      setName(name.slice(1,-1));
    }
  }, []);
    const signout = () => {
        handleStatus('login');
        setLogged(false);
    }

    return (
        <>
        <div className="account-summary">
        <div className="account-title">Account Summary</div>
        <div className="account-line"><strong>Hello,</strong> {fName}!</div>
        <div className="account-line"><strong>Email:</strong> {email}</div>
        <div className="account-line"><strong>Date Created:</strong> {dateCreated}</div>
        <div>
         <button className="account-action" onClick={signout}>Signout</button>
        </div>
        </div>
        </>
    );
};
//ppp
export default Summary;