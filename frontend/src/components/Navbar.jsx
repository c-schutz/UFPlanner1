import React from 'react';
import { NavLink } from 'react-router-dom';
import './nbstyles.css'; 
import logo from "./images/IMG_1309.jpg"

function Navbar() {
    return (
        <nav>
            <ul className="linklist">
                <li className='nospace'><img src={logo} alt="Logo" className="logo-image" /></li>
                <li className="links"><NavLink className='link1' to="/About">About</NavLink></li>
                <li className="links"><NavLink className='link2' to="/Budget">Budget</NavLink></li>
                <li className="links"><NavLink className='link3' to="/Account">Account</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;