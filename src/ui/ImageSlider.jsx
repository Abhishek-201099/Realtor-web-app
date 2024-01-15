import { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

export default function ImageSlider({ imgUrls }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="slider-container">
      <div className="slider-main">
        <div className="slider-left" onClick={handleLeftClick}>
          <FaChevronLeft />
        </div>
        <div className="slider-right" onClick={handleRightClick}>
          <FaChevronRight />
        </div>
        <div
          className="slider-copy"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success(`Link copied`);
          }}
        >
          <FaLink />
        </div>
        <div
          className={`slider-slides`}
          style={{
            backgroundImage: `url(${imgUrls?.[currentIndex]})`,
          }}
        ></div>
      </div>
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
    </div>
  );
}
