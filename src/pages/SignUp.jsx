import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

import { capitalizeEachWord, capitalizeFirstLetter } from "../helpers/helpers";
import AuthForms from "../ui/AuthForms";

export default function SignUp() {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    const { name, email, password } = data;
    setIsSigningUp(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: capitalizeEachWord(name),
      });
      const user = userCredentials.user;
      await setDoc(doc(db, "users", user.uid), {
        name: capitalizeEachWord(name),
        email,
        timeStamp: serverTimestamp(),
      });
      reset();
      navigate("/");
      toast.success(`Successfully signed up`);
    } catch (error) {
      toast.error(
        `${capitalizeFirstLetter(
          error.code.split("/").at(1).split("-").join(" ")
        )}`
      );
    } finally {
      setIsSigningUp(false);
    }
  }

  return (
    <AuthForms
      authFor="sign-up"
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isLoading={isSigningUp}
    />
  );
}
