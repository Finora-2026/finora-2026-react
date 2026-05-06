import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="d-flex justify-content-center align-items-start py-5">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          Create Account
        </h2>

        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Full Name"
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="text-center text-muted small mt-3">
          Already have an account?{" "}
          <Link
            to="/finora-login"
            className="text-decoration-none fw-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}