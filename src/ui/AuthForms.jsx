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
    <section className="section-auth">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onSubmit}>
          {authFor === "sign-up" && (
            <div className="auth-name-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                disabled={isLoading}
                className={`${errors?.name?.message ? "form-input-error" : ""}`}
                {...register("name", {
                  required: "Please enter your name",
                })}
              />
              {errors?.name?.message && (
                <p className="form-error">{errors?.name?.message}</p>
              )}
            </div>
          )}
          <div className="auth-input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              disabled={isLoading}
              className={`${errors?.email?.message ? "form-input-error" : ""}`}
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors?.email?.message && (
              <p className="form-error">{errors?.email?.message}</p>
            )}
          </div>
          {authFor !== "forgotPassword" && (
            <div className="auth-password-field">
              <label htmlFor="password">Password</label>
              <div className="auth-passowrd-input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  disabled={isLoading}
                  className={`${
                    errors?.password?.message ? "form-input-error" : ""
                  }`}
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
              {errors?.password?.message && (
                <p className="form-error">{errors?.password?.message}</p>
              )}
            </div>
          )}
          <div className="auth-register">
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

          <div className="auth-buttons">
            <button type="submit" disabled={isLoading}>
              {isLoading ? <Loader /> : submitBtnText}
            </button>
            {authFor !== "forgotPassword" && (
              <>
                <div className="auth-buttons-separator">
                  <p>or</p>
                </div>
                <GoogleSignInBtn isLoading={isLoading} authFor={authFor} />
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
