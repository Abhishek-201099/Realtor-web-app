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

export default function ListingRents() {
  const [rentListings, setRentListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchRentListings() {
      try {
        setIsLoading(true);
        const rentListingsRef = collection(db, "listings");
        const q = query(
          rentListingsRef,
          where("sellOrRent", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({ id: doc.id, data: doc.data() });
        });
        setRentListings([...listings]);
      } catch (error) {
        console.log("Error : ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRentListings();
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
      <h2 className="offers-heading">Recent rent listings</h2>
      <p className="offers-show-more">Show more rent listings</p>
      <div className="offers-list">
        {rentListings?.map((listing) => (
          <MyListingItem key={listing.id} isHome={true} userListing={listing} />
        ))}
      </div>
    </div>
  );
}
