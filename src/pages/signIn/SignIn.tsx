import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../utils/authService";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await authService.login({ email, password });

      if (res.success) {
        navigate("/");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start py-5">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3 btn-lg fw-semibold shadow-sm"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="text-danger text-center mb-2">
              {error}
            </div>
          )}
        </form>

        <div className="d-flex justify-content-between mb-3">
          <Link to="/login-otp-request" className="text-decoration-none small">
            Login with Email OTP
          </Link>

          <Link to="/forgot-password" className="text-decoration-none small">
            Forgot password?
          </Link>
        </div>

        <p className="text-center text-muted small mt-3">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-decoration-none fw-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}