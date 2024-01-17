import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { auth } from "../../firebase";
import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function NavList({ isAuthenticated }) {
  const navigate = useNavigate();
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);
  const ref = useOutsideClick(handleClick);

  function handleClick() {
    setIsOpenContextMenu(false);
  }

  function handleContextMenuToggle(e) {
    e.stopPropagation();
    const rect = e.target.closest("div").getBoundingClientRect();
    setContextMenuPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 10,
    });
    setIsOpenContextMenu((isOpenContextMenu) => !isOpenContextMenu);
  }

  return (
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
                <div
                  className="nav-context-menu-item"
                  onClick={() => {
                    navigate("/create-listing");
                    setIsOpenContextMenu(false);
                  }}
                >
                  Rent or sell
                </div>
                <div
                  className="nav-context-menu-item"
                  onClick={() => {
                    navigate("/my-listings");
                    setIsOpenContextMenu(false);
                  }}
                >
                  My listings
                </div>
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
  );
}
