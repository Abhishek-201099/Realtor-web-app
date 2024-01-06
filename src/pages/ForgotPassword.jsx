import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

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
      toast.error(`${error.code.split("/").at(1).split("-").join(" ")}`);
    } finally {
      setIsSendingResetEmail(false);
    }
  }

  return (
    <section className="section-signin">
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="signin-input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              {...register("email", {
                required: "Please enter your email",
              })}
            />
            {errors?.email?.message && <p>{errors?.email?.message}</p>}
          </div>
          <div className="signin-register">
            <p>
              Don&apos;t have an account ? <Link to="/sign-up">Register</Link>
            </p>
            <Link to="/sign-in">Sign-in instead</Link>
          </div>

          <div className="signin-buttons">
            <button type="submit">
              {isSendingResetEmail ? <Loader /> : "Send reset email"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
