import { Link, Routes, Route } from 'react-router-dom';
import Login from "./Login"
import Signup from "./Signup"
import Navbar from '../components/Navbar';

const Account = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2>Account Page</h2>
        <nav>
          <ul>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="signup">Signup</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route to='Account/Login' element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
};

export default Account;