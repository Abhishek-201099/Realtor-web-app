import NavLogo from "./NavLogo";
import Hamburger from "./Hamburger";
import NavList from "./NavList";
import { useNav } from "./useNav";

export default function Navbar() {
  const { isAuthenticated } = useNav();

  return (
    <header className="navbar">
      <NavLogo />

      <Hamburger isAuthenticated={isAuthenticated} />

      <NavList isAuthenticated={isAuthenticated} />
    </header>
  );
}
