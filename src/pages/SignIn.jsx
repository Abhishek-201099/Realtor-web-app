import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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

  async function handleOAuthSignUp() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // CHECK IF USER EXISTS
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
      toast.success(`Successfully signed up`);
    } catch (error) {
      console.log(error.code.split("/").at(1).split("-").join(" "));
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
          <div className="signin-password-field">
            <label htmlFor="password">Password</label>
            <div className="signin-passowrd-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Please enter your password",
                })}
              />
              {showPassword ? (
                <AiFillEye
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
              )}
            </div>
            {errors?.password?.message && <p>{errors?.password?.message}</p>}
          </div>
          <div className="signin-register">
            <p>
              Don&apos;t have an account ? <Link to="/sign-up">Register</Link>
            </p>
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>

          <div className="signin-buttons">
            <button type="submit">
              {isSigningIn ? <Loader /> : "Sign-in"}
            </button>
            <div className="signin-buttons-separator">
              <p>or</p>
            </div>
            <button type="button" onClick={() => handleOAuthSignUp()}>
              <span>
                <FcGoogle />
              </span>
              <span>Continue with Google</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
