import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { IoMdClose } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";

export default function NavHamburger({ setIsOpenHamburger, isAuthenticated }) {
  const navigate = useNavigate();

  return (
    <div className="delete-listing-overlay">
      <div className="hamburger-menu-container">
        <div
          className="hamburger-menu-close"
          onClick={() => {
            setIsOpenHamburger(false);
          }}
        >
          <IoMdClose />
        </div>
        <div
          className="hamburger-item"
          onClick={() => {
            setIsOpenHamburger(false);
            navigate("/");
          }}
        >
          Home
        </div>
        <div
          className="hamburger-item"
          onClick={() => {
            setIsOpenHamburger(false);
            navigate("/offers");
          }}
        >
          Offers
        </div>
        {!isAuthenticated ? (
          <div
            className="hamburger-item hamburger-item-signin"
            onClick={() => {
              setIsOpenHamburger(false);
              navigate("/sign-in");
            }}
          >
            Sign-in
          </div>
        ) : (
          <>
            <div
              className="hamburger-item"
              onClick={() => {
                setIsOpenHamburger(false);
                navigate("/profile");
              }}
            >
              Update profile
            </div>
            <div
              className="hamburger-item"
              onClick={() => {
                setIsOpenHamburger(false);
                navigate("/create-listing");
              }}
            >
              Sell or rent
            </div>
            <div
              className="hamburger-item"
              onClick={() => {
                setIsOpenHamburger(false);
                navigate("/my-listings");
              }}
            >
              My listings
            </div>
            <div
              className="hamburger-item"
              onClick={() => {
                auth.signOut();
                setIsOpenHamburger(false);
                navigate("/");
              }}
            >
              <span>
                <PiSignOutBold />
              </span>
              <span>Sign-out</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
