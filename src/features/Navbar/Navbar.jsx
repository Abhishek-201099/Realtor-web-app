import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const ref = useOutsideClick(handleClick);

  useEffect(function () {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  function handleContextMenuToggle(e) {
    e.stopPropagation();
    const rect = e.target.closest("div").getBoundingClientRect();
    setContextMenuPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 10,
    });
    setIsOpenContextMenu((isOpenContextMenu) => !isOpenContextMenu);
  }

  function handleClick() {
    setIsOpenContextMenu(false);
  }

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
          {!isAuthenticated ? (
            <NavLink to="/sign-in">Sign-in</NavLink>
          ) : (
            <>
              <div className="nav-account" onClick={handleContextMenuToggle}>
                <FaRegUserCircle />
              </div>
              {isOpenContextMenu && (
                <div
                  ref={ref}
                  className="nav-context-menu-list"
                  style={{
                    position: "absolute",
                    top: `${contextMenuPosition.y}px`,
                    right: `${contextMenuPosition.x}px`,
                  }}
                >
                  <div
                    className="nav-context-menu-item"
                    onClick={() => {
                      navigate("/profile");
                      setIsOpenContextMenu(false);
                    }}
                  >
                    Update Profile
                  </div>
                  <div className="nav-context-menu-item">Rent or sell</div>
                  <div
                    className="nav-context-menu-item"
                    onClick={() => {
                      auth.signOut();
                      navigate("/");
                      setIsOpenContextMenu(false);
                    }}
                  >
                    <span>
                      <PiSignOutBold />
                    </span>
                    <span>Sign-out</span>
                  </div>
                </div>
              )}
            </>
          )}
        </li>
      </ul>
    </header>
  );
}
