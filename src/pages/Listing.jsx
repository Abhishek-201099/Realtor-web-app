import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Loader from "../ui/Loader";

export default function Listing() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchListing() {
        setIsLoading(true);
        try {
          const docRef = doc(db, "listings", params.listingId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("DocSnap : ", docSnap.data());
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

  return <div>listing</div>;
}
