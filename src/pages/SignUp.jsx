import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    console.log("signUp form data : ", data);
    const { name, email, password } = data;
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredentials.user;
      console.log("user : ", user);
      reset();
    } catch (error) {
      console.log("Error : ", error.message);
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
              Have an account ? <Link to="/sign-in">Sign-in</Link>
            </p>
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>

          <div className="signin-buttons">
            <button type="submit">Sign-up</button>
            <div className="signin-buttons-separator">
              <p>or</p>
            </div>
            <button type="button">
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
