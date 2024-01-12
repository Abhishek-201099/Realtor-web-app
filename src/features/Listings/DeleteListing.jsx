import useOutsideClick from "../../hooks/useOutsideClick";

export default function DeleteListing({
  handleDelete,
  setIsOpenDeleteListing,
  activeListing,
}) {
  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenDeleteListing(false);
  }

  return (
    <div className="delete-listing-overlay">
      <div ref={ref} className="delete-listing-container">
        <p>Are you sure you want to delete this listing ?</p>
        <div className="delete-listing-btns">
          <button onClick={() => handleDelete(activeListing)}>Yes</button>
          <button onClick={() => setIsOpenDeleteListing(false)}>No</button>
        </div>
      </div>
    </div>
  );
}
