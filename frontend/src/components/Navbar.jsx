import { NavLink } from "react-router-dom";
import './nbstyles.css';

function Navbar() {

    return (
        <>
            <nav>
                <l1 className='nospace'><span>logo here</span></l1>
                <l1 className="links"><NavLink className='link1' to="/About">About</NavLink></l1>
                <l1 className="links"><NavLink className='link2' to="/Budget">Budget</NavLink></l1>
                <l1 className="links"><NavLink className='link3' to="/Account">Account</NavLink></l1>
            </nav>
        </>
    );
}

export default Navbar;