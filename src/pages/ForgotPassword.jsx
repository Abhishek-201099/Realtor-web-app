import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import AuthForms from "../ui/AuthForms";
import { capitalizeFirstLetter } from "../helpers/helpers";

export default function ForgotPassword() {
  const [isSendingResetEmail, setIsSendingResetEmail] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { email } = data;
    setIsSendingResetEmail(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(`Email to reset the password has been sent`);
    } catch (error) {
      toast.error(
        `${capitalizeFirstLetter(
          error.code.split("/").at(1).split("-").join(" ")
        )}`
      );
    } finally {
      setIsSendingResetEmail(false);
    }
  }

  return (
    <AuthForms
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isLoading={isSendingResetEmail}
      authFor="forgotPassword"
    />
  );
}
