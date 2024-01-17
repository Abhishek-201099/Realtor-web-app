import NavHamburger from "./NavHamburger";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";

export default function Hamburger({ isAuthenticated }) {
  const [isOpenHamburger, setIsOpenHamburger] = useState(false);

  return (
    <>
      <div className="nav-hamburger" onClick={() => setIsOpenHamburger(true)}>
        <TiThMenu />
      </div>
      {isOpenHamburger && (
        <NavHamburger
          setIsOpenHamburger={setIsOpenHamburger}
          isAuthenticated={isAuthenticated}
        />
      )}
    </>
  );
}
