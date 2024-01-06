import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import GoogleSignInBtn from "./GoogleSignInBtn";
import { useState } from "react";

export default function AuthForms({
  onSubmit,
  register,
  errors,
  isLoading,
  authFor,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const submitBtnText =
    authFor === "forgotPassword"
      ? "Send reset email"
      : authFor === "sign-in"
      ? "Sign in"
      : authFor === "sign-up"
      ? "Sign up"
      : "";

  return (
    <section className="section-signin">
      <div className="signin-container">
        <form className="signin-form" onSubmit={onSubmit}>
          {authFor === "sign-up" && (
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
          )}
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
          {authFor !== "forgotPassword" && (
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
          )}
          <div className="signin-register">
            {authFor === "sign-up" && (
              <p>
                Have an account ? <Link to="/sign-in">Sign-in</Link>
              </p>
            )}
            {authFor === "sign-in" && (
              <p>
                Don&apos;t have an account ? <Link to="/sign-up">Register</Link>
              </p>
            )}
            {authFor === "forgotPassword" && (
              <p>
                Don&apos;t have an account ? <Link to="/sign-up">Register</Link>
              </p>
            )}
            {authFor !== "forgotPassword" ? (
              <Link to="/forgot-password">Forgot password ?</Link>
            ) : (
              <Link to="/sign-in">Sign-in instead</Link>
            )}
          </div>

          <div className="signin-buttons">
            <button type="submit">
              {isLoading ? <Loader /> : submitBtnText}
            </button>
            {authFor !== "forgotPassword" && (
              <>
                <div className="signin-buttons-separator">
                  <p>or</p>
                </div>
                <GoogleSignInBtn />
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
