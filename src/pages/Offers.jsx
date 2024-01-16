import { useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import MyListingItem from "../features/Listings/MyListingItem";
import Loader from "../ui/Loader";

export default function Offers() {
  const [loading, setLoading] = useState(false);
  const [offerListings, setOfferListings] = useState([]);
  const [lastFetched, setLastFetched] = useState(null);

  useEffect(function () {
    async function fetchOfferListings() {
      try {
        setLoading(true);
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", "yes"),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        const lastFetchedListing = querySnap.docs[querySnap.docs.length - 1];
        querySnap.forEach((doc) => {
          listings.push({ id: doc.id, data: doc.data() });
        });
        setOfferListings([...listings]);
        setLastFetched(lastFetchedListing);
      } catch (error) {
        console.log("Error : ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOfferListings();
  }, []);

  async function fetchMoreListing() {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("offer", "==", "yes"),
        orderBy("timestamp", "desc"),
        startAfter(lastFetched),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const listings = [];
      const lastFetchedListing = querySnap.docs[querySnap.docs.length - 1];
      querySnap.forEach((doc) => {
        listings.push({ id: doc.id, data: doc.data() });
      });
      setOfferListings((offerListings) => [...offerListings, ...listings]);
      setLastFetched(lastFetchedListing);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  if (loading) {
    return (
      <div className="fullpage">
        <Loader />
      </div>
    );
  }

  return (
    <section className="section-offers">
      <h2 className="offer-listing-heading">
        <span>
          <BiSolidOffer />
        </span>
        <span>Offers</span>
      </h2>
      <div className="offers-list">
        {offerListings.map((listing) => {
          return (
            <MyListingItem
              key={listing.id}
              userListing={listing}
              isHome={true}
            />
          );
        })}
      </div>
      {lastFetched && (
        <div className="offer-fetchmore">
          <button onClick={fetchMoreListing}>Load more</button>
        </div>
      )}
    </section>
  );
}
