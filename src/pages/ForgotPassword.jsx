import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log("forgotPassword form data : ", data);
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
          <div className="signin-register">
            <p>
              Don&apos;t have an account ? <Link to="/sign-up">Register</Link>
            </p>
            <Link to="/sign-in">Sign-in instead</Link>
          </div>

          <div className="signin-buttons">
            <button>Send reset email</button>
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
