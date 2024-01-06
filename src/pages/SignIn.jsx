import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import AuthForms from "../ui/AuthForms";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { email, password } = data;
    setIsSigningIn(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        toast.success("Successfully signed in");
        navigate("/");
      }
    } catch (error) {
      toast.error(`${error.code.split("/").at(1).split("-").join(" ")}`);
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <AuthForms
      authFor="sign-in"
      isLoading={isSigningIn}
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
    />
  );
}
