import { useNavigate } from "react-router-dom";
import { MdOutlineAddCircleOutline } from "react-icons/md";

export default function UserEmptyListing() {
  const navigate = useNavigate();

  return (
    <div className="myListing-empty">
      <p>Currently there are no listings ...</p>
      <button onClick={() => navigate("/create-listing")}>
        <span>
          <MdOutlineAddCircleOutline />
        </span>
        <span>Add a new listing</span>
      </button>
    </div>
  );
}
