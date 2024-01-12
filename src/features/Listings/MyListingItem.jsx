import { FaBed, FaBath, FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

export default function MyListingItem({
  userListing,
  setIsOpenDeleteListing,
  setActiveListing,
}) {
  const navigate = useNavigate();

  return (
    <div className="myListing-list-item">
      <div className="myListing-item-img">
        <div className="myListing-item-time">
          <Moment fromNow>{userListing.data.timestamp?.toDate()}</Moment>
        </div>
        <img src={userListing.data.imgUrls.at(0)} alt={userListing.name} />
        <div className="listing-overlay">
          <button
            className="listing-overlay-btns"
            onClick={() =>
              navigate(
                `/category/${userListing.data.sellOrRent}/${userListing.id}`
              )
            }
          >
            <FaEye />
          </button>
          <button
            className="listing-overlay-btns"
            onClick={() => navigate(`/edit-listing/${userListing.id}`)}
          >
            <MdEdit />
          </button>
          <button
            className="listing-overlay-btns"
            onClick={() => {
              setIsOpenDeleteListing(true);
              setActiveListing(userListing);
            }}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      <p className="myListing-item-address">
        <span>
          <FaMapMarkerAlt />
        </span>
        <span>{userListing.data.address}</span>
      </p>
      <p className="myListing-item-name">{userListing.data.name}</p>
      <p className="myListing-item-price">
        &#8377;{" "}
        {userListing.data.offer === "yes"
          ? userListing.data.discountPrice.toLocaleString("en-IN")
          : userListing.data.regularPrice.toLocaleString("en-IN")}
        {userListing.data.sellOrRent === "rent" ? " / month" : ""}
      </p>
      <div className="myListing-beds-baths">
        <p>
          <span>
            <FaBed />
          </span>
          <span>{userListing.data.beds} bed</span>
        </p>
        <p>
          <span>
            <FaBath />
          </span>
          <span>{userListing.data.baths} bath</span>
        </p>
      </div>
    </div>
  );
}
