import { useEffect, useState } from "react";
import { MdSell } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
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
import { useParams } from "react-router-dom";

export default function Category() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [categoryListings, setCategoryListings] = useState([]);
  const [lastFetched, setLastFetched] = useState(null);

  useEffect(
    function () {
      async function fetchOfferListings() {
        try {
          setLoading(true);
          const listingRef = collection(db, "listings");
          const q = query(
            listingRef,
            where("sellOrRent", "==", params.categoryName),
            orderBy("timestamp", "desc"),
            limit(8)
          );
          const querySnap = await getDocs(q);
          const listings = [];
          const lastFetchedListing = querySnap.docs[querySnap.docs.length - 1];
          querySnap.forEach((doc) => {
            listings.push({ id: doc.id, data: doc.data() });
          });
          setCategoryListings([...listings]);
          setLastFetched(lastFetchedListing);
        } catch (error) {
          console.log("Error : ", error);
        } finally {
          setLoading(false);
        }
      }

      fetchOfferListings();
    },
    [params.categoryName]
  );

  async function fetchMoreListing() {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("sellOrRent", "==", params.categoryName),
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
      setCategoryListings((offerListings) => [...offerListings, ...listings]);
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
          {params.categoryName === "sell" ? <MdSell /> : <GoPasskeyFill />}
        </span>
        <span>{params.categoryName === "sell" ? "Sale" : "Rent"}</span>
      </h2>
      <div className="offers-list">
        {categoryListings.map((listing) => {
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
