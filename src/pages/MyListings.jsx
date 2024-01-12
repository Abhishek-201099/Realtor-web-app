import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Loader from "../ui/Loader";
import toast from "react-hot-toast";
import { deleteObject, getStorage, ref } from "firebase/storage";

import MyListingItem from "../features/Listings/MyListingItem";
import DeleteListing from "../features/Listings/DeleteListing";
import UserEmptyListing from "../features/Listings/userEmptyListing";
import { getImageName } from "../helpers/helpers";

export default function MyListings() {
  const [userListings, setUserListings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isOpenDeleteListing, setIsOpenDeleteListing] = useState(false);
  const [activeListing, setActiveListing] = useState(null);

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

  async function handleDelete(userListing) {
    try {
      const storage = getStorage();

      await deleteDoc(doc(db, "listings", userListing.id));
      const updatedListing = userListings.filter(
        (listing) => listing.id !== userListing.id
      );
      setUserListings([...updatedListing]);

      userListing.data.imgUrls.forEach(async (imgUrl) => {
        const imgToDelete = getImageName(imgUrl);
        const fileRef = ref(storage, imgToDelete);
        await deleteObject(fileRef);
      });

      toast.success(`Successfully deleted the listing`);
      setIsOpenDeleteListing(false);
    } catch (error) {
      toast.error(`Failed to delete the listing`);
    }
  }

  if (isFetching)
    return (
      <div className="fullpage">
        <Loader />
      </div>
    );

  if (!userListings.length) return <UserEmptyListing />;

  return (
    <section className="section-myListing">
      <div className="myListing-container">
        <h1 className="myListing-heading">My listings</h1>
        <div className="myListing-list">
          {userListings.map((userListing) => {
            return (
              <MyListingItem
                key={userListing.id}
                userListing={userListing}
                setIsOpenDeleteListing={setIsOpenDeleteListing}
                setActiveListing={setActiveListing}
              />
            );
          })}
        </div>
      </div>

      {isOpenDeleteListing && (
        <DeleteListing
          handleDelete={handleDelete}
          setIsOpenDeleteListing={setIsOpenDeleteListing}
          activeListing={activeListing}
        />
      )}
    </section>
  );
}
