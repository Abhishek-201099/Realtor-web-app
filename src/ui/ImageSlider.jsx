import { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function ImageSlider({ imgUrls, isHome = false, listings }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentListing = listings?.find(
    (listing) => listing?.data?.imgUrls[0] === imgUrls[currentIndex]
  );

  function handleLeftClick() {
    const nextIndex =
      currentIndex === 0 ? imgUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
  }

  function handleRightClick() {
    const nextIndex =
      currentIndex === imgUrls.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }

  function handleOnClick() {
    if (isHome) {
      navigate(
        `/category/${currentListing?.data?.sellOrRent}/${currentListing?.id}`
      );
    }
  }

  return (
    <div className="slider-container">
      <div className="slider-main">
        <div className="slider-left" onClick={handleLeftClick}>
          <FaChevronLeft />
        </div>
        <div className="slider-right" onClick={handleRightClick}>
          <FaChevronRight />
        </div>
        {isHome && (
          <div className="slider-listing-price">
            &#8377;{" "}
            {currentListing?.data?.offer === "yes"
              ? currentListing?.data?.discountPrice.toLocaleString("en-IN")
              : currentListing?.data?.regularPrice.toLocaleString("en-IN")}
            {currentListing?.data?.sellOrRent === "rent" ? " / month" : ""}
          </div>
        )}
        {isHome && (
          <div className="slider-listing-name">
            {currentListing?.data?.name}
          </div>
        )}
        {!isHome && (
          <div
            className="slider-copy"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success(`Link copied`);
            }}
          >
            <FaLink />
          </div>
        )}
        <div
          className={`slider-slides`}
          onClick={handleOnClick}
          style={{
            backgroundImage: `url(${imgUrls?.[currentIndex]})`,
          }}
        ></div>
      </div>
      {!isHome && (
        <div className="slider-navigation">
          {imgUrls?.map((imgUrl, index) => {
            return (
              <div
                className={`slider-navigation-item ${
                  index === currentIndex ? "active" : ""
                }`}
                key={index}
                style={{ backgroundImage: `url(${imgUrl})` }}
                onClick={() => {
                  setCurrentIndex(index);
                }}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
}
