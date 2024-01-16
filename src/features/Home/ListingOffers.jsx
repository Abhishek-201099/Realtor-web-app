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

export default function ListingOffers() {
  const navigate = useNavigate();
  const [offerListings, setOfferListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchOfferListings() {
      try {
        setIsLoading(true);
        const offerListingsRef = collection(db, "listings");
        const q = query(
          offerListingsRef,
          where("offer", "==", "yes"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({ id: doc.id, data: doc.data() });
        });
        setOfferListings([...listings]);
      } catch (error) {
        console.log("Error : ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOfferListings();
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
      <h2 className="offers-heading">Recent offers</h2>
      <p className="offers-show-more" onClick={() => navigate("/offers")}>
        Show more offers
      </p>
      <div className="offers-list">
        {offerListings?.map((listing) => (
          <MyListingItem key={listing.id} isHome={true} userListing={listing} />
        ))}
      </div>
    </div>
  );
}
