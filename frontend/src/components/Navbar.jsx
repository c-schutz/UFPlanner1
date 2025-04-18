import React from 'react';
import { NavLink } from 'react-router-dom';
import './nbstyles.css'; 
import logo from "./images/UFinancial with background-Picsart-BackgroundRemover.jpg"

function Navbar() {
    return (
        <nav>
            <ul className="linklist">
                <li className='nospace'><img src={logo} alt="Logo" className="logo-image" /></li>
                <li className="links"><NavLink to="/About">About</NavLink></li>
                <li className="links"><NavLink to="/Budget">Budget</NavLink></li>
                <li className="links"><NavLink to="/Account">Account</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;