import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="d-flex justify-content-center align-items-start py-5">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          Welcome Back
        </h2>

        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Email"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Password"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary w-100 mb-3 btn-lg fw-semibold shadow-sm"
          >
            Login
          </button>
        </form>

        {/* Optional links */}
        <div className="d-flex justify-content-between mb-3">
          <Link
            to="/login-otp-request"
            className="text-decoration-none small"
          >
            Login with Email OTP
          </Link>

          <Link
            to="/forgot-password"
            className="text-decoration-none small"
          >
            Forgot password?
          </Link>
        </div>

        <p className="text-center text-muted small mt-3">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-decoration-none fw-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}