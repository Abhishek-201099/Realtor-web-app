import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Loader from "../ui/Loader";
import ImageSlider from "../ui/ImageSlider";
import ListingDetail from "../features/Listings/ListingDetail";
import ListingMap from "../features/Listings/ListingMap";
import ListingContactForm from "../features/Listings/ListingContactForm";

export default function Listing() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [listingData, setListingData] = useState({});

  useEffect(
    function () {
      async function fetchListing() {
        setIsLoading(true);
        try {
          const docRef = doc(db, "listings", params.listingId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setListingData(docSnap.data());
          }
        } catch (error) {
          console.log("Error in fetching listing : ", error.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchListing();
    },
    [params.listingId]
  );

  if (isLoading)
    return (
      <div className="fullpage">
        <Loader />
      </div>
    );

  return (
    <section className="section-listing">
      <div className="listing-info">
        <div className="listing-imgs">
          <ImageSlider imgUrls={listingData?.imgUrls} />
        </div>
        <ListingDetail listingData={listingData} />
      </div>
      <ListingMap listingData={listingData} />
      <ListingContactForm listingData={listingData} />
    </section>
  );
}
