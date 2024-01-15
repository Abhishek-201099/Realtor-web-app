import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { IoIosMail } from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";

export default function ListingContactForm({ listingData }) {
  const [owner, setOwner] = useState({});
  const [isOpenContactForm, setIsOpenContactForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(
    function () {
      async function fetchOwnerInfo() {
        try {
          if (!listingData?.userRef) return;
          const docRef = doc(db, "users", listingData?.userRef);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setOwner(docSnap.data());
          }
        } catch (error) {
          console.log("Error in fetching owner details : ", error);
        }
      }

      fetchOwnerInfo();
    },
    [listingData?.userRef]
  );

  function handleChange(e) {
    setMessage(e.target.value);
  }

  if (!isOpenContactForm) {
    return (
      <div className="listing-contact-container">
        <button
          className="listing-contact-btn"
          onClick={() => setIsOpenContactForm(true)}
        >
          <span>
            <IoIosMail />
          </span>
          <span>Contact owner</span>
        </button>
      </div>
    );
  }

  return (
    <div className="listing-contact-form-container">
      <p className="contact-form-heading">
        Contact <span>{owner?.name}</span> for this listing
      </p>

      <div className="listing-contact-form">
        <textarea
          value={message}
          onChange={handleChange}
          cols="30"
          rows="10"
          placeholder="Enter a message..."
        ></textarea>

        <a
          className={`${!message ? "disable-link" : ""}`}
          href={`mailto:${owner?.email}?Subject=${listingData?.name}&body=${message}`}
        >
          <span>
            <FaPaperPlane />
          </span>
          <span>Send message</span>
        </a>
      </div>
    </div>
  );
}
