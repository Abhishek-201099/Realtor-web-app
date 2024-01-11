import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed, FaBath } from "react-icons/fa";
import Loader from "../ui/Loader";

export default function MyListings() {
  const [userListings, setUserListings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(function () {
    async function fetchUserListings() {
      try {
        setIsFetching(true);
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({ id: doc.id, data: doc.data() });
        });
        setUserListings([...listings]);
      } catch (error) {
        console.error("Error in fetching : ", error.message);
      } finally {
        setIsFetching(false);
      }
    }

    fetchUserListings();
  }, []);

  console.log("userListings : ", userListings);

  if (isFetching)
    return (
      <div className="fullpage">
        <Loader />
      </div>
    );

  return (
    <section className="section-myListing">
      <div className="myListing-container">
        <h1 className="myListing-heading">My listings</h1>
        <div className="myListing-list">
          {userListings.map((userListing) => {
            return (
              <div key={userListing.id} className="myListing-list-item">
                <div className="myListing-item-img">
                  <img
                    src={userListing.data.imgUrls.at(0)}
                    alt={userListing.name}
                  />
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
                    ? userListing.data.discountPrice
                    : userListing.data.regularPrice}
                  {userListing.data.offer === "yes" ? " / month" : ""}
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
          })}
        </div>
      </div>
    </section>
  );
}
