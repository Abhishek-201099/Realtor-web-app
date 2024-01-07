import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="navbar">
      <div className="nav-logo-container" onClick={() => navigate("/")}>
        <img
          className="nav-logo"
          src="/logo-realtor.svg"
          alt="realtor website logo"
        />
      </div>
      <ul className="nav-list">
        <li className="nav-list-item">
          <NavLink to="/home">Home</NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink to="/offers">Offers</NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink to="/sign-in">SignIn</NavLink>
        </li>
      </ul>
    </header>
  );
}
