import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../../ui/Loader";
import ImageSlider from "../../ui/ImageSlider";

export default function HomeSlider() {
  const [listings, setListings] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function fetchListings() {
      try {
        setLoading(true);
        const listingRef = collection(db, "listings");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({ id: doc.id, data: doc.data() });
        });
        setListings([...listings]);
      } catch (error) {
        console.log("Error : ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  useEffect(
    function () {
      const urls = [];
      listings?.forEach((listing) => {
        urls.push(listing?.data?.imgUrls[0]);
      });
      if (urls.length) {
        setImgUrls([...urls]);
      }
    },
    [listings]
  );

  if (loading)
    return (
      <div className="fullpage">
        <Loader />
      </div>
    );

  return (
    <div className="home-image-slider">
      <ImageSlider imgUrls={imgUrls} isHome={true} listings={listings} />
    </div>
  );
}
