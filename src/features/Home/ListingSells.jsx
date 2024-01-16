import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Loader from "../../ui/Loader";
import MyListingItem from "../Listings/MyListingItem";
import { useNavigate } from "react-router-dom";

export default function ListingsSells() {
  const navigate = useNavigate();
  const [sellListings, setSellListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchSellListings() {
      try {
        setIsLoading(true);
        const sellListingsRef = collection(db, "listings");
        const q = query(
          sellListingsRef,
          where("sellOrRent", "==", "sell"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({ id: doc.id, data: doc.data() });
        });
        setSellListings([...listings]);
      } catch (error) {
        console.log("Error : ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSellListings();
  }, []);

  if (isLoading) {
    return (
      <div className="fullpage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="home-offers-container">
      <h2 className="offers-heading">Recent sell listings</h2>
      <p
        className="offers-show-more"
        onClick={() => navigate("/category/sell")}
      >
        Show more sell listings
      </p>
      <div className="offers-list">
        {sellListings?.map((listing) => (
          <MyListingItem key={listing.id} isHome={true} userListing={listing} />
        ))}
      </div>
    </div>
  );
}
