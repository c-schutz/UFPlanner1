import React from 'react';
import { NavLink } from 'react-router-dom';
import './nbstyles.css';

function Navbar() {
    return (
        <nav>
            <ul className="linklist">
                <li className='nospace'><span>logo here</span></li>
                <li className="links"><NavLink className='link1' to="/About">About</NavLink></li>
                <li className="links"><NavLink className='link2' to="/Budget">Budget</NavLink></li>
                <li className="links"><NavLink className='link3' to="/Account">Account</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;