import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsHouseAdd } from "react-icons/bs";
import { MdOutlineAddCircleOutline } from "react-icons/md";

export default function CreateListing() {
  const [isOffer, setIsOffer] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log("data : ", data);
    reset();
  }

  return (
    <section className="section-createListing">
      <div className="createListing-container">
        <p className="createListing-heading">
          <span>
            <BsHouseAdd />
          </span>{" "}
          <span>Create a new listing</span>
        </p>
        <form className="createListing-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="createListing-field">
            <label htmlFor="sell">Sell or Rent</label>
            <div className="field-btn-grp">
              <div className="btn-grp-item">
                <input
                  type="radio"
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
              className={`${errors?.name?.message ? "form-input-error" : ""}`}
              {...register("name", {
                required: "Please enter your name",
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
                  type="text"
                  id="bed"
                  className={`${
                    errors?.beds?.message ? "form-input-error" : ""
                  }`}
                  {...register("beds", {
                    required: "Please enter number of baths and beds",
                  })}
                />
              </div>
              <div className="btn-grp-item">
                <label htmlFor="bath">Baths</label>
                <input
                  type="text"
                  id="bath"
                  className={`${
                    errors?.baths?.message ? "form-input-error" : ""
                  }`}
                  {...register("baths", {
                    required: "Please enter number of baths and beds",
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
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              cols="30"
              rows="10"
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
              type="text"
              id="regularPrice"
              className={`${
                errors?.regularPrice?.message ? "form-input-error" : ""
              }`}
              {...register("regularPrice", {
                required: "Please enter the price",
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
                type="text"
                id="discountPrice"
                className={`${
                  errors?.discountPrice?.message ? "form-input-error" : ""
                }`}
                {...register("discountPrice", {
                  required: "Please enter the price",
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
              className={`${
                errors?.listingImages?.message ? "form-input-error" : ""
              }`}
              {...register("listingImages", {
                required: "At least one image is required",
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

          <button type="submit">
            <span>
              <MdOutlineAddCircleOutline />
            </span>
            <span>Add new listing</span>
          </button>
        </form>
      </div>
    </section>
  );
}
