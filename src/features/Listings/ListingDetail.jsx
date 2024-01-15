import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { LuParkingCircle, LuParkingCircleOff } from "react-icons/lu";
import { TbArmchair, TbArmchairOff } from "react-icons/tb";
import { capitalizeEachWord } from "../../helpers/helpers";

export default function ListingDetail({ listingData }) {
  return (
    <div className="listing-details">
      <p className="listing-name">{capitalizeEachWord(listingData?.name)}</p>
      <p className="listing-address">
        <span>
          <FaMapMarkerAlt />
        </span>
        <span>{listingData?.address}</span>
      </p>
      <p className="listing-price">
        &#8377;{" "}
        {listingData?.offer === "yes"
          ? listingData?.discountPrice?.toLocaleString("en-IN")
          : listingData?.regularPrice?.toLocaleString("en-IN")}
        {listingData?.offer === "yes" ? "/ month" : ""}
      </p>
      <p className="listing-description">{listingData?.description}</p>
      <div className="listing-amenities">
        <p className="listing-amenities-item">
          <span>
            <FaBath />
          </span>
          <span>
            {listingData?.baths} {listingData?.baths > 1 ? "Baths" : "Bath"}
          </span>
        </p>
        <p className="listing-amenities-item">
          <span>
            <FaBed />
          </span>
          <span>
            {listingData?.beds} {listingData?.beds > 1 ? "Beds" : "Bed"}
          </span>
        </p>
        <p className="listing-amenities-item">
          <span>
            {listingData?.parkingSpot === "yes" ? (
              <LuParkingCircle />
            ) : (
              <LuParkingCircleOff />
            )}
          </span>
          <span>
            {listingData?.parkingSpot === "yes" ? "Parking" : "No parking"}
          </span>
        </p>
        <p className="listing-amenities-item">
          <span>
            {listingData?.furnished === "yes" ? (
              <TbArmchair />
            ) : (
              <TbArmchairOff />
            )}
          </span>
          <span>
            {listingData?.furnished === "yes" ? "Furnished" : "Not furnished"}
          </span>
        </p>
      </div>
    </div>
  );
}
