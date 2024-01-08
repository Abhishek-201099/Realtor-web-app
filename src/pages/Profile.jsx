import { useForm } from "react-hook-form";
import { auth, db } from "../firebase";
import { capitalizeEachWord, capitalizeFirstLetter } from "../helpers/helpers";
import toast from "react-hot-toast";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Loader from "../ui/Loader";

export default function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: auth.currentUser.displayName,
    },
  });

  async function onSubmit(data) {
    const { name } = data;
    setIsUpdating(true);
    try {
      if (name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: capitalizeEachWord(name),
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
        toast.success(`Successfully updated the profile name`);
      }
    } catch (error) {
      toast.error(
        `${capitalizeFirstLetter(
          error.code.split("/").at(1).split("-").join(" ")
        )}`
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="section-profile">
      <div className="profile-container">
        <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile-email-field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={auth.currentUser.email}
              disabled
            />
          </div>
          <div className="profile-name-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              disabled={isUpdating}
              className={`${errors?.name?.message ? "form-input-error" : ""}`}
              {...register("name", {
                required: "This field is required",
              })}
            />
            {errors?.name?.message && (
              <p className="form-error">{errors?.name?.message}</p>
            )}
          </div>
          <button disabled={isUpdating} className="profile-submit-btn">
            {isUpdating ? <Loader /> : "Apply changes"}
          </button>
        </form>
      </div>
    </section>
  );
}
