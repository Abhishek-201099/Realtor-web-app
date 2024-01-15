import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillHouseGearFill } from "react-icons/bs";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import Loader from "../ui/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { getImageName } from "../helpers/helpers";

export default function EditListing() {
  const navigate = useNavigate();
  const params = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [listingData, setListingData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(
    function () {
      if (listingData && listingData?.userRef !== auth.currentUser.uid) {
        navigate("/");
        toast.error(`You're Not authorized to edit that listing`);
      }
    },
    [listingData, navigate]
  );

  useEffect(
    function () {
      async function fetchListingFromParams() {
        try {
          const docRef = doc(db, "listings", params.listingId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setListingData(docSnap.data());
          }
        } catch (error) {
          console.log(`Can't fetch the listing data`, error);
        }
      }

      fetchListingFromParams();
    },
    [params.listingId]
  );

  useEffect(
    function () {
      listingData?.offer === "yes" ? setIsOffer(true) : setIsOffer(false);
      setValue("name", listingData?.name);
      setValue("beds", listingData?.beds);
      setValue("baths", listingData?.baths);
      setValue("description", listingData?.description);
      setValue("regularPrice", listingData?.regularPrice);
      setValue("discountPrice", listingData?.discountPrice);
      setValue("address", listingData?.address);
      setValue("lattitude", listingData?.geolocation.lattitude);
      setValue("longitude", listingData?.geolocation.longitude);
      setValue(
        "sellOrRent",
        listingData?.sellOrRent === "sell" ? "sell" : "rent"
      );
      setValue("furnished", listingData?.furnished === "yes" ? "yes" : "no");
      setValue(
        "parkingSpot",
        listingData?.parkingSpot === "yes" ? "yes" : "no"
      );
      setValue("offer", listingData?.offer === "yes" ? "yes" : "no");
    },
    [listingData, setValue]
  );

  function storeImages(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          progress === 100 && console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  async function onSubmit(data) {
    setIsUploading(true);
    const { offer, listingImages, lattitude, longitude } = data;
    const geolocation = { lattitude, longitude };
    let imgUrls;

    if (listingImages.length) {
      const storage = getStorage();
      try {
        listingData?.imgUrls.forEach(async (imgUrl) => {
          const imgToDelete = getImageName(imgUrl);
          const fileRef = ref(storage, imgToDelete);
          console.log("FileRef : ", fileRef);
          await deleteObject(fileRef);
        });
      } catch (error) {
        console.log("Error in deleting already existing images : ", error);
      }

      imgUrls = await Promise.all(
        [...listingImages].map((image) => storeImages(image))
      ).catch(() => {
        toast.error(`There's an error in uploading the listing images`);
        return;
      });
    }

    const updatedData = {
      ...data,
      geolocation,
      imgUrls: imgUrls ?? listingData?.imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    delete updatedData.listingImages;
    offer === "no" && delete updatedData.discountPrice;
    delete updatedData.lattitude;
    delete updatedData.longitude;

    try {
      await updateDoc(doc(db, "listings", params.listingId), updatedData);
      toast.success("Successfully updated the listing");
      navigate(`/category/${updatedData.sellOrRent}/${params.listingId}`);
    } catch (error) {
      toast.error(`There was a problem in updating the listing`);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section className="section-createListing">
      <div className="createListing-container">
        <p className="createListing-heading">
          <span>
            <BsFillHouseGearFill />
          </span>{" "}
          <span>Edit listing</span>
        </p>
        <form className="createListing-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="createListing-field">
            <label htmlFor="sell">Sell or Rent</label>
            <div className="field-btn-grp">
              <div className="btn-grp-item">
                <input
                  type="radio"
                  disabled={isUploading}
                  className={`${
                    errors?.sellOrRent?.message ? "form-input-error" : ""
                  }`}
                  {...register("sellOrRent", {
                    required: "Please select one option",
                  })}
                  id="sell"
                  value="sell"
                />
                <label htmlFor="sell">Sell</label>
              </div>
              <div className="btn-grp-item">
                <input
                  type="radio"
                  disabled={isUploading}
                  className={`${
                    errors?.sellOrRent?.message ? "form-input-error" : ""
                  }`}
                  {...register("sellOrRent", {
                    required: "Please select one option",
                  })}
                  id="rent"
                  value="rent"
                />
                <label htmlFor="rent">Rent</label>
              </div>
            </div>
            {errors?.sellOrRent?.message && (
              <p className="form-error">{errors?.sellOrRent?.message}</p>
            )}
          </div>

          <div className="createListing-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              disabled={isUploading}
              className={`${errors?.name?.message ? "form-input-error" : ""}`}
              {...register("name", {
                required: "Please enter the name",
              })}
            />
            {errors?.name?.message && (
              <p className="form-error">{errors?.name?.message}</p>
            )}
          </div>

          <div className="createListing-field">
            <div className="field-btn-grp">
              <div className="btn-grp-item">
                <label htmlFor="bed">Beds</label>
                <input
                  type="number"
                  id="bed"
                  disabled={isUploading}
                  className={`${
                    errors?.beds?.message ? "form-input-error" : ""
                  }`}
                  {...register("beds", {
                    required: "Please enter number of baths and beds",
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="btn-grp-item">
                <label htmlFor="bath">Baths</label>
                <input
                  type="number"
                  id="bath"
                  disabled={isUploading}
                  className={`${
                    errors?.baths?.message ? "form-input-error" : ""
                  }`}
                  {...register("baths", {
                    required: "Please enter number of baths and beds",
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
            {(errors?.beds?.message || errors?.baths?.message) && (
              <p className="form-error">
                {errors?.beds?.message || errors?.baths?.message}
              </p>
            )}
          </div>

          <div className="createListing-field">
            <label htmlFor="parkingYes">Parking spot</label>
            <div className="field-btn-grp">
              <div className="btn-grp-item">
                <input
                  type="radio"
                  disabled={isUploading}
                  className={`${
                    errors?.parkingSpot?.message ? "form-input-error" : ""
                  }`}
                  {...register("parkingSpot", {
                    required: "Please select one option",
                  })}
                  id="parkingYes"
                  value="yes"
                />
                <label htmlFor="parkingYes">Yes</label>
              </div>
              <div className="btn-grp-item">
                <input
                  type="radio"
                  disabled={isUploading}
                  className={`${
                    errors?.parkingSpot?.message ? "form-input-error" : ""
                  }`}
                  {...register("parkingSpot", {
                    required: "Please select one option",
                  })}
                  id="parkingNo"
                  value="no"
                />
                <label htmlFor="parkingNo">No</label>
              </div>
            </div>
            {errors?.parkingSpot?.message && (
              <p className="form-error">{errors?.parkingSpot?.message}</p>
            )}
          </div>

          <div className="createListing-field">
            <label htmlFor="furnishedYes">Furnished</label>
            <div className="field-btn-grp">
              <div className="btn-grp-item">
                <input
                  type="radio"
                  disabled={isUploading}
                  className={`${
                    errors?.furnished?.message ? "form-input-error" : ""
                  }`}
                  {...register("furnished", {
                    required: "Please select one option",
                  })}
                  id="furnishedYes"
                  value="yes"
                />
                <label htmlFor="furnishedYes">Yes</label>
              </div>
              <div className="btn-grp-item">
                <input
                  disabled={isUploading}
                  type="radio"
                  className={`${
                    errors?.furnished?.message ? "form-input-error" : ""
                  }`}
                  {...register("furnished", {
                    required: "Please select one option",
                  })}
                  id="furnishedNo"
                  value="no"
                />
                <label htmlFor="furnishedNo">No</label>
              </div>
            </div>
            {errors?.furnished?.message && (
              <p className="form-error">{errors?.furnished?.message}</p>
            )}
          </div>

          <div className="createListing-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              cols="30"
              rows="10"
              disabled={isUploading}
              className={`${
                errors?.address?.message ? "form-input-error" : ""
              }`}
              {...register("address", {
                required: "Please enter the address",
              })}
            ></textarea>
            {errors?.address?.message && (
              <p className="form-error">{errors?.address?.message}</p>
            )}
          </div>

          <div className="createListing-field">
            <div className="field-btn-grp">
              <div className="btn-grp-item">
                <label htmlFor="lattitude">Lattitude</label>
                <input
                  type="number"
                  id="lattitude"
                  step="any"
                  disabled={isUploading}
                  className={`${
                    errors?.lattitude?.message ? "form-input-error" : ""
                  }`}
                  {...register("lattitude", {
                    required:
                      "Please enter lattitude and longitude of the property",
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="btn-grp-item">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="number"
                  id="longitude"
                  step="any"
                  disabled={isUploading}
                  className={`${
                    errors?.longitude?.message ? "form-input-error" : ""
                  }`}
                  {...register("longitude", {
                    required:
                      "Please enter lattitude and longitude of the property",
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
            {(errors?.longitude?.message || errors?.lattitude?.message) && (
              <p className="form-error">
                {errors?.longitude?.message || errors?.lattitude?.message}
              </p>
            )}
          </div>

          <div className="createListing-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              cols="30"
              rows="10"
              disabled={isUploading}
              className={`${
                errors?.description?.message ? "form-input-error" : ""
              }`}
              {...register("description", {
                required: "Please enter a description",
              })}
            ></textarea>
            {errors?.description?.message && (
              <p className="form-error">{errors?.description?.message}</p>
            )}
          </div>

          <div className="createListing-field">
            <label htmlFor="offerYes">Offer</label>
            <div className="field-btn-grp">
              <div className="btn-grp-item">
                <input
                  type="radio"
                  disabled={isUploading}
                  className={`${
                    errors?.offer?.message ? "form-input-error" : ""
                  }`}
                  {...register("offer", {
                    required: "Please select one option",
                  })}
                  id="offerYes"
                  value="yes"
                  onClick={() => setIsOffer(true)}
                />
                <label htmlFor="offerYes">Yes</label>
              </div>
              <div className="btn-grp-item">
                <input
                  disabled={isUploading}
                  className={`${
                    errors?.offer?.message ? "form-input-error" : ""
                  }`}
                  type="radio"
                  {...register("offer", {
                    required: "Please select one option",
                  })}
                  id="offerNo"
                  value="no"
                  onClick={() => setIsOffer(false)}
                />
                <label htmlFor="offerNo">No</label>
              </div>
            </div>
            {errors?.offer?.message && (
              <p className="form-error">{errors?.offer?.message}</p>
            )}
          </div>

          <div className="createListing-field">
            <label htmlFor="regularPrice">Regular price</label>
            <input
              type="number"
              id="regularPrice"
              step="any"
              disabled={isUploading}
              className={`${
                errors?.regularPrice?.message ? "form-input-error" : ""
              }`}
              {...register("regularPrice", {
                required: "Please enter the price",
                valueAsNumber: true,
              })}
            />
            {errors?.regularPrice?.message && (
              <p className="form-error">{errors?.regularPrice?.message}</p>
            )}
          </div>

          {isOffer && (
            <div className="createListing-field">
              <label htmlFor="discountPrice">Discount price</label>
              <input
                type="number"
                id="discountPrice"
                disabled={isUploading}
                step="any"
                className={`${
                  errors?.discountPrice?.message ? "form-input-error" : ""
                }`}
                {...register("discountPrice", {
                  required: "Please enter the price",
                  valueAsNumber: true,
                  validate: (value) => {
                    if (value >= getValues().regularPrice)
                      return "Discount price cannot be greater or equal to regular price";
                  },
                })}
              />
              {errors?.discountPrice?.message && (
                <p className="form-error">{errors?.discountPrice?.message}</p>
              )}
            </div>
          )}

          <div className="createListing-field">
            <label htmlFor="img">Listing images ( * 6 images )</label>
            <input
              type="file"
              disabled={isUploading}
              className={`${
                errors?.listingImages?.message ? "form-input-error" : ""
              }`}
              {...register("listingImages", {
                validate: (value) => {
                  if (value.length > 6) return "Please select only 6 images";
                },
              })}
              id="img"
              accept="image/*"
              multiple
            />
            {errors?.listingImages?.message && (
              <p className="form-error">{errors?.listingImages?.message}</p>
            )}
          </div>

          <button type="submit" disabled={isUploading}>
            {isUploading ? (
              <Loader />
            ) : (
              <>
                <span>
                  <MdOutlineAddCircleOutline />
                </span>
                <span>Save changes</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
