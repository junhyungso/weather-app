import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav className="home-nav">
        <Link to="/">Weather.io</Link>
      </nav>
      <ul className="ul">
        <li>
          <Link to="/about">Help</Link>
        </li>
        <li>
          <Link to="/members">Sign Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
