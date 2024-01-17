import { useNavigate } from "react-router-dom";
import { BsFillHouseCheckFill } from "react-icons/bs";

export default function NavLogo() {
  const navigate = useNavigate();

  return (
    <div className="nav-logo-container" onClick={() => navigate("/")}>
      <div className="nav-logo">
        <span>
          <BsFillHouseCheckFill />
        </span>
        <span>Realtor.com</span>
      </div>
    </div>
  );
}
