import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log("signin form data : ", data);
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
            {errors?.email?.message && <p>errors?.email?.message</p>}
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
            {errors?.password?.message && <p>errors?.password?.message</p>}
          </div>
          <div className="signin-register">
            <p>
              Don&apos;t have an account ? <Link to="/sign-up">Register</Link>
            </p>
            <Link to="/forgot-password">Forgot password ?</Link>
          </div>

          <div className="signin-buttons">
            <button>Sign-in</button>
            <div className="signin-buttons-separator">
              <p>or</p>
            </div>
            <button>
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
