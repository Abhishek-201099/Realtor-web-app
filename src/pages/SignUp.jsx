import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

import Loader from "../ui/Loader";
import { capitalizeEachWord, capitalizeFirstLetter } from "../helpers/helpers";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
          <div className="signin-name-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Louis Armstrong"
              {...register("name", {
                required: "Please enter your name",
              })}
            />
            {errors?.name?.message && <p>{errors?.name?.message}</p>}
          </div>
          <div className="signin-input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
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
                  minLength: {
                    value: 8,
                    message: "Password needs minimum of 8 characters",
                  },
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
              Have an account ? <Link to="/sign-in">Sign-in</Link>
            </p>
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>

          <div className="signin-buttons">
            <button type="submit">
              {isSigningUp ? <Loader /> : "Sign-up"}
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
